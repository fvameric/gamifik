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
import { Router } from '@angular/router';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

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

  imgSrc: any;
  imgError: boolean = false;

  oldPassValidation: boolean = false;


  // token
  logUserToken: any;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    
    this.obtenerDatosAlumno();
    this.crearFormulario();

    this.authService.guardarRoute(this.router.url);
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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor elige una imagen'
        });
      }
    }
  }

  confirmarModif(form: any) {
    let userModif: User;

    if (form.valid) {
      if (form.controls.inputPass.value != '') {
        userModif = {
          id: this.datosAlumno.id_alumno,
          email: form.controls.inputEmail.value,
          pass: form.controls.inputPass.value,
          nombre: form.controls.inputNombre.value,
          apellidos: form.controls.inputApellidos.value,
          imagen: this.imgSrc
        }
      } else {
        userModif = {
          id: this.datosAlumno.id_alumno,
          email: form.controls.inputEmail.value,
          nombre: form.controls.inputNombre.value,
          apellidos: form.controls.inputApellidos.value,
          imagen: this.imgSrc
        }
      }
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
            this.usersService.modificarAlumno(userModif).subscribe((val: any) => {
              this.editableNombre = true;
              this.editableApellidos = true;
              this.editableEmail = true;
              this.tokenService.saveUser(val.data);
              this.obtenerDatosAlumno();
              window.location.reload();
            });
          });
        }
      });
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
      if (this.datosAlumno.email != this.form.inputEmail.value) {
        this.usersService.validarEmailExisteAlumnos(formEmail).subscribe((val: any) => {
          this.formEmail.markAsPending({ emitEvent: true });
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
        this.usersService.validarPassAlumnos(formPass, this.datosAlumno.id_alumno).subscribe((val: any) => {
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
      this.form['inputEmail'].setValue(this.email);
      this.editableEmail = true;
    }
  }

  mostrarEditarContra() {
    const parent: HTMLElement = document.getElementById('arrow-pass')!;

    if (this.mostrarEditarContrasena == true) {
      this.mostrarEditarContrasena = false;
      parent.setAttribute("style", "transform: rotate(0deg);");
    } else {
      this.checkPass();
      //this.formEmail.setErrors({ required: false });
      this.mostrarEditarContrasena = true;
      parent.setAttribute("style", "transform: rotate(90deg);");
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