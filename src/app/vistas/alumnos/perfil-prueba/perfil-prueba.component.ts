import { Component, OnInit } from '@angular/core';
import { Alumno } from 'app/interfaces/Alumno';
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
  selector: 'app-perfil-prueba',
  templateUrl: './perfil-prueba.component.html',
  styleUrls: ['./perfil-prueba.component.css']
})
export class PerfilPruebaComponent implements OnInit {

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

  datosAlumno: Alumno = {
    id_alumno: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date(),
    tipo: 0,
    imagen: ''
  };

  datosStorage: any;

  oldPass: string = '';
  newPass: string = '';
  newConfPass: string = '';

  imgSrc: string = '';

  oldPassValidation: boolean = false;

  arrSwal: any = [
    { id: 0, icon: 'success', title: 'Ok', text: 'Se han guardaron los cambios' },
    { id: 1, icon: 'error', title: 'Error', text: 'Contraseña y confirmar contraseña no pueden quedar vacíos' },
    { id: 2, icon: 'error', title: 'Error', text: 'Las contraseñas tienen que coincidir' },
    { id: 3, icon: 'error', title: 'Error', text: 'La contraseña actual no es correcta' },
    { id: 4, icon: 'error', title: 'Error', text: 'Este email ya está en uso' }
  ];

  // token
  logUserToken: any;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerDatosAlumno();
    this.crearFormulario();
    //this.checkEmail();
    //this.checkPass();
  }

  obtenerDatosAlumno() {
    this.datosAlumno = this.tokenService.getUser();

    this.nombre = this.datosAlumno.nombre;
    this.apellidos = this.datosAlumno.apellidos;
    this.email = this.datosAlumno.email;
    this.imgSrc = this.datosAlumno.imagen;
  }

  /********** funciones formulario **********/
  crearFormulario() {
    //Validadors registre
    this.modificacionForm = this.formBuilder.group({
      inputNombre: [this.nombre],
      inputApellidos: [this.apellidos],
      inputEmail: [this.email, [Validators.required]],
      inputOldPass: [''],
      inputPass: [''],
      inputConfirmPass: ['', [Validators.required]]
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

  confirmarModif(form: any) {
    let userModif: User = {
      id: this.datosAlumno.id_alumno,
      email: form.inputEmail,
      pass: this.datosAlumno.pass,
      nombre: form.inputNombre,
      apellidos: form.inputApellidos
    }

    if (form.inputOldPass == '' && form.inputPass == '' && form.inputConfirmPass == '') {
      this.generarSwal(this.arrSwal[0], userModif);
    } else {

    }
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
      if (!this.editableEmail && this.datosAlumno.email != this.form.inputEmail.value) {
        this.usersService.validarEmailExisteAlumnos(formEmail).subscribe((val: any) => {
          if (val.resultado == 'error') {
            this.formEmail.setErrors({ notUnique: true });
          }
        });
      }
    });
  }

  checkPass() {
    this.form.inputOldPass.valueChanges.subscribe((formPass) => {
      if (formPass != '' && formPass != this.datosAlumno.pass) {
        this.formPass.setErrors({incorrect: true});
      }
    });
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) =>
        this.imgSrc = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  generarSwal(swal: any, user?: User) {
    if (swal.id == 0) {
      if (user != undefined || user != null) {
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
              icon: swal.icon,
              title: swal.title,
              text: swal.text
            });

            this.usersService.modificarAlumno(user).subscribe((val: any) => {
              this.editableNombre = true;
              this.editableApellidos = true;
              this.editableEmail = true;
              this.tokenService.saveUser(val.data);
              this.obtenerDatosAlumno();
              this.ngOnInit();
            });

            this.ngOnInit();
          }
        });
      }
    } else {
      Swal.fire({
        icon: swal.icon,
        title: swal.title,
        text: swal.text
      });
    }
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

  editarNombre() {
    if (this.editableNombre == true) {
      this.editableNombre = false;
    } else {

      //(<HTMLInputElement>document.getElementById('inputNombre')).value = this.nombre;

      this.form['inputNombre'].setValue(this.nombre);
      this.editableNombre = true;
    }
  }

  editarApellidos() {
    if (this.editableApellidos == true) {
      this.editableApellidos = false;
    } else {
      //(<HTMLInputElement>document.getElementById('inputApellidos')).value = this.apellidos;

      this.form['inputApellidos'].setValue(this.apellidos);
      this.editableApellidos = true;
    }
  }

  editarEmail() {
    if (this.editableEmail == true) {
      this.editableEmail = false;

      this.checkEmail();
    } else {
      //(<HTMLInputElement>document.getElementById('inputEmail')).value = this.email;

      this.form['inputEmail'].setValue(this.email);
      this.editableEmail = true;
    }
  }

  mostrarEditarContra() {
    if (this.mostrarEditarContrasena == true) {
      this.mostrarEditarContrasena = false;
    } else {
      this.checkPass();
      this.formEmail.setErrors({ required: false });
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