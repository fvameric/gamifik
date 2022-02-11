import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

// interfaces
import { Alumno } from 'app/interfaces/Alumno';
import { AuthService } from 'services/auth.service';
import { Profesor } from 'app/interfaces/Profesor';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // formulario
  registerForm!: FormGroup;

  // flags del formulario
  submitted: boolean = false;
  passShown: boolean = false;
  confirmPassShown: boolean = false;

  // para mostrar la contraseña introducida en el input
  passType: string = 'password';
  confirmPassType: string = 'password';

  // ngIf en caso de querer registrarnos como profesor
  registroProfe: boolean = false;

  // input para acceder como profesor
  passAcceso: string = '';

  // avatar por defecto al registrarse
  imgSrc: string = "/assets/avatardefault.png";

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.crearFormAlumno();
  }

  crearFormAlumno() {
    //Validadors registre
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(".*\\S.*[a-zA-z0-9_]")]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      fechaNacimiento: ['', Validators.required]
    }, {
      //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
      validator: this.mustMatch("password", "confirmPassword")
    }
    );
  }

  crearFormProfesor() {
    //Validadors registre
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(".*\\S.*[a-zA-z0-9_]")]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      centro: ['', Validators.required]
    }, {
      //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
      validator: this.mustMatch("password", "confirmPassword")
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
    return this.registerForm.controls;
  }

  public togglePass() {
    if (this.passShown) {
      this.passShown = false;
      this.passType = 'password';

    } else {
      this.passShown = true;
      this.passType = 'text';
    }
  }

  public toggleConfirmPass() {
    if (this.confirmPassShown) {
      this.confirmPassShown = false;
      this.confirmPassType = 'password';

    } else {
      this.confirmPassShown = true;
      this.confirmPassType = 'text';
    }
  }

  profe() {
    if (this.registroProfe) {
      this.crearFormAlumno();
      this.registroProfe = false;
    }

    if (this.passAcceso == "12") {
      this.passAcceso = "";
      this.crearFormProfesor();
      this.registroProfe = true;
    }
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result as string;
      reader.readAsDataURL(file);
    }
  }
  
  //Funció que executa quan s'apreta el botó registre
  onRegistro(form: any) {
    this.submitted = true;
    if (this.registroProfe) {
      //Comprobar si es cumpleixen o no tots els errors
      if (!this.registerForm.invalid) {
        const nuevoProfesor: Profesor = {
          id: 0,
          nick: form.username,
          email: form.email,
          pass: form.password,
          nombre: form.nombre,
          apellidos: form.apellidos,
          centro: form.centro,
          tipo: 1
        }
        this.authService.registroProfesor(nuevoProfesor);
      }
    } else {  
      //Comprobar si es cumpleixen o no tots els errors
      if (!this.registerForm.invalid) {
        const nuevoAlumno: Alumno = {
          id: 0,
          nick: form.username,
          email: form.email,
          pass: form.password,
          nombre: form.nombre,
          apellidos: form.apellidos,
          fecha_nacimiento: form.fechaNacimiento,
          tipo: 0
        }
        this.authService.registroAlumno(nuevoAlumno);
      }
    }
  }
}