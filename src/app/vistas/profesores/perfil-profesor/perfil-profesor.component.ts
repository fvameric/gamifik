import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../interfaces/Profesor';
import { User } from 'app/interfaces/User';
import { UsersService } from 'services/users.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenService } from 'services/token.service';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {

  modificacionForm!: FormGroup;

  profesores: any;
  alumnos: any;

  mostrarRankingsVisual: boolean = false;
  mostrarConfiguracionVisual: boolean = false;
  mostrarCerrarVisual: boolean = false;
  editableEmail: boolean = true;
  editableNombre: boolean = true;
  editableApellidos: boolean = true;

  passType: string = 'password';
  passTypeNew: string = 'password';
  passTypeConfirmNew: string = 'password';

  antiguaContrasena: boolean = false;
  nuevaContrasena: boolean = false;
  confirmarNuevaContrasena: boolean = false;
  mostrarEditarContrasena: boolean = false;

  nombre: string = '';
  apellidos: string = '';
  email: string = '';

  datosProfesor: Profesor = {
    id_profe: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0,
    tipo: 1,
    imagen: ''
  };

  datosStorage: any;

  oldPass: string = '';
  newPass: string = '';
  newConfPass: string = '';

  imgSrc: any;
  imgError: boolean = false;

  oldPassValidation: boolean = false;

  flagRanks: boolean = false;
  rankingIds: any;
  datosRanking: any;
  arrRankings: any[] = [];

  userLocStorage: any;

  // token
  logUserToken: any;

  // formulario
  registerForm!: FormGroup;

  centroSelec: number = 0;

  listaCentros = [
    { id: 0, nombre: 'Ilerna' },
    { id: 1, nombre: 'Caparrella' },
    { id: 2, nombre: 'Almenar' }
  ];

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.crearFormulario();
  }

  obtenerDatosProfesor() {
    this.datosProfesor = this.tokenService.getUser();

    this.nombre = this.datosProfesor.nombre;
    this.apellidos = this.datosProfesor.apellidos;
    this.email = this.datosProfesor.email;
    this.imgSrc = this.datosProfesor.imagen;
    this.centroSelec = this.datosProfesor.centro;
  }

  /********** funciones formulario **********/
  crearFormulario() {
    //Validadors registre
    this.modificacionForm = this.formBuilder.group({
      inputNombre: [this.nombre],
      inputApellidos: [this.apellidos],
      inputEmail: [this.email],
      inputOldPass: [''],
      inputPass: ['', [Validators.minLength(6), Validators.maxLength(50)]],
      inputConfirmPass: ['']
    }, {
      //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
      validator: this.mustMatch("inputPass", "inputConfirmPass")
    }
    );
  }

  // funció per controlar que camps password i confirmarpassword siguin iguals
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  //Retorna els valors introduits al formulari
  get form() {
    return this.modificacionForm.controls;
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type.indexOf('image') == 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imgSrc = reader.result;
        reader.readAsDataURL(file);
      } else {
        this.imgError = true;
      }
    }
  }

  confirmarModif(form: any) {
    console.log(form);
    if (form.valid) {
      if (!this.imgError) {
        let userModif: User = {
          id: this.datosProfesor.id_profe,
          email: form.controls.inputEmail.value,
          pass: this.datosProfesor.pass,
          nombre: form.controls.inputNombre.value,
          apellidos: form.controls.inputApellidos.value,
          imagen: this.imgSrc
        }

        console.log(userModif);
        Swal.fire({
          title: '¿Quieres guardar los cambios?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'Ok',
              text: 'Se han guardaron los cambios',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this.usersService.modificarProfesor(userModif).subscribe((val: any) => {
                this.editableNombre = true;
                this.editableApellidos = true;
                this.editableEmail = true;
                this.tokenService.saveUser(val.data);
                this.obtenerDatosProfesor();
                //window.location.reload();
              });
            });
          }
        });
      }
    }

    /*
    let userModif: User = {
      id: this.datosProfesor.id_profe,
      email: this.email,
      pass: this.datosProfesor.pass,
      nombre: this.nombre,
      apellidos: this.apellidos,
      centro: this.centroSelec
    }
    // validacion para no duplicar emails
    if (this.datosProfesor.email != this.email) {
      this.comprobarEmail(this.email);
    }
    // en caso de que se quiera cambiar el email, nombre o apellidos
    // pero no la password
    if (this.oldPass == '' && this.newPass == '' && this.newConfPass == '') {
      this.generarSwal(this.arrSwal[0], userModif);
    } else {
      if (this.oldPass == this.datosProfesor.pass) {
        if (this.newPass == '' || this.newConfPass == '') {
          this.generarSwal(this.arrSwal[1]);
        } else {

          // en caso de que se quiera cambiar cualquier dato y
          // además, la password
          if (this.newPass == this.newConfPass) {
            let userModif: User = {
              id: this.datosProfesor.id_profe,
              email: this.email,
              pass: this.newConfPass,
              nombre: this.nombre,
              apellidos: this.apellidos,
              centro: this.centroSelec
            }

            this.generarSwal(this.arrSwal[0], userModif);
          } else {
            this.generarSwal(this.arrSwal[2]);
          }
        }
      } else {
        this.generarSwal(this.arrSwal[3]);
      }
    }
    */
  }

  // devuelve email
  get formEmail() {
    return this.modificacionForm.get('inputEmail') as FormControl;
  }

  // devuelve pass
  get formPass() {
    return this.modificacionForm.get('inputOldPass') as FormControl;
  }

  checkEmail() {
    this.form.inputEmail.valueChanges.subscribe((formEmail) => {
      console.log(formEmail);
      if (this.datosProfesor.email != this.form.inputEmail.value) {
        this.usersService.validarEmailExisteProfes(formEmail).subscribe((val: any) => {
          console.log(val);
          if (val.resultado == 'error') {
            this.formEmail.setErrors({ notUnique: true });
          }
        });
      } else {
        this.formEmail.setErrors(null);
      }
    });
  }

  checkPass() {
    this.form.inputOldPass.valueChanges.subscribe((formPass) => {
      if (formPass != '') {
        this.usersService.validarPassProfes(formPass, this.datosProfesor.id_profe).subscribe((val: any) => {
          console.log(val);
          if (val.resultado == 'error') {
            this.formPass.setErrors({ notUnique: true });
          }
        });
      } else {
        this.formPass.setErrors(null);
      }
    });
  }


  /********** funciones botones del perfil **********/
  mostrarConfiguracion() {
    if (this.mostrarConfiguracionVisual == false) {
      this.mostrarConfiguracionVisual = true;
      this.mostrarRankingsVisual = false;
      this.mostrarCerrarVisual = false;
    } else {
      this.mostrarConfiguracionVisual = false;
    }
  }

  mostrarCerrar() {
    if (this.mostrarCerrarVisual == false) {
      this.mostrarCerrarVisual = true;
      this.mostrarRankingsVisual = false;
      this.mostrarConfiguracionVisual = false;
    } else {
      this.mostrarCerrarVisual = false;
    }
  }

  editarEmail() {
    if (this.editableEmail == true) {
      this.editableEmail = false;
    } else {
      (<HTMLInputElement>document.getElementById('inputEmail')).value;
      (<HTMLInputElement>document.getElementById('inputEmail')).value = '';
      this.editableEmail = true;
    }
  }

  editarNombre() {
    if (this.editableNombre == true) {
      this.editableNombre = false;
    } else {
      if (document.getElementById('guardarNombre')) {
      }

      (<HTMLInputElement>document.getElementById('inputNombre')).value;
      (<HTMLInputElement>document.getElementById('inputNombre')).value = '';
      this.editableNombre = true;
    }
  }

  editarApellidos() {
    if (this.editableApellidos == true) {
      this.editableApellidos = false;
    } else {
      (<HTMLInputElement>document.getElementById('inputApellidos')).value;
      (<HTMLInputElement>document.getElementById('inputApellidos')).value = '';
      this.editableApellidos = true;
    }
  }

  mostrarEditarContra() {
    if (this.mostrarEditarContrasena == true) {
      this.mostrarEditarContrasena = false;
    } else {
      this.mostrarEditarContrasena = true;
    }
  }

  visualizarAntiguaContrasena() {
    if (this.antiguaContrasena == false) {
      this.antiguaContrasena = true;
      this.passType = 'text';
    } else {
      this.antiguaContrasena = false;
      this.passType = 'password';
    }
  }

  visualizarNuevaContrasena() {
    if (this.nuevaContrasena == false) {
      this.nuevaContrasena = true;
      this.passTypeNew = 'text';
    } else {
      this.nuevaContrasena = false;
      this.passTypeNew = 'password';
    }
  }
  visualizarConfirmarNuevaContrasena() {
    if (this.confirmarNuevaContrasena == false) {
      this.confirmarNuevaContrasena = true;
      this.passTypeConfirmNew = 'text';
    } else {
      this.confirmarNuevaContrasena = false;
      this.passTypeConfirmNew = 'password';
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }
}