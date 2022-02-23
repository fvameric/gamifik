import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  RequiredValidator,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';

// interfaces
import { Alumno } from 'app/interfaces/Alumno';
import { AuthService } from 'services/auth.service';
import { Profesor } from 'app/interfaces/Profesor';
import { debounceTime, repeat, tap } from 'rxjs/operators';
import { UsersService } from 'services/users.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
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
  imgSrc: string = '/assets/avatardefault.png';

  constructor(
    private usersService: UsersService,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private HttpClient: HttpClient
  ) {}

  ngOnInit() {
    this.crearFormAlumno();

    //Comprueba que el correo electrónico y nombre user no se repitan
    this.checkEmail();
    this.checkUsername();
  }

  // devuelve email
  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  get username() {
    return this.registerForm.get('username') as FormControl;
  }

  //Disponibilidad email
  checkEmail() {
    this.email.valueChanges
      .pipe(
        debounceTime(500),
        tap((email) => {
          if (email !== '' && this.email.invalid) {
            this.email.markAsPending();
          } else {
            this.email.setErrors({ invalid: true });
          }
        })
      )
      .subscribe((email) => {
        this.usersService
          .validarEmailExisteAlumnos(email)
          .subscribe((val: any) => {
            if (val.resultado == 'error') {
              console.log('ha sido error');

              this.email.markAsPending({ onlySelf: false });
              this.email.setErrors({ notUnique: true });
            } else {
              console.log('funciona');

              this.email.markAsPending({ onlySelf: false });
              if (email.length > 0) {
                this.email.setErrors(null);
              } else {
                this.email.setErrors({ required: true });
              }
            }
          });
      });
  }

  // Disponibilidad usuario
  checkUsername() {
    this.username.valueChanges
      .pipe(
        debounceTime(500),
        tap((username) => {
          if (username !== '' && this.username.invalid) {
            this.username.markAsPending();
          } else {
            this.username.setErrors({ invalid: true });
          }
        })
      )
      .subscribe((username) => {
        this.usersService
          .validarUsuarioExisteAlumnos(username)
          .subscribe((val: any) => {
            if (val.resultado == 'error') {
              console.log('ha sido error');

              this.username.markAsPending({ onlySelf: false });
              this.username.setErrors({ notUnique: true });
            } else {
              console.log('funciona');

              this.username.markAsPending({ onlySelf: false });
              if (username.length > 0) {
                this.username.setErrors(null);
              } else {
                this.username.setErrors({ required: true });
              }
            }
          });
      });
  }

  crearFormAlumno() {
    //Validadors registre
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9_]+$'),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(3)],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        nombre: ['', [Validators.required, Validators.minLength(1)]],
        apellidos: ['', [Validators.required, Validators.minLength(2)]],
        fechaNacimiento: ['', Validators.required],
        userImage: [''],
      },
      {
        //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  crearFormProfesor() {
    //Validadors registre
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9_]+$'),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(3)],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        nombre: ['', [Validators.required, Validators.minLength(1)]],
        apellidos: ['', [Validators.required, Validators.minLength(2)]],
        centro: ['', Validators.required],
        userImage: [''],
      },
      {
        //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
        validator: this.mustMatch('password', 'confirmPassword'),
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

    if (this.passAcceso == '12') {
      this.passAcceso = '';
      this.crearFormProfesor();
      this.registroProfe = true;
    }
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  //Funció que executa quan s'apreta el botó registre
  onRegistro(form: any) {
    this.submitted = true;
    if (this.registroProfe) {
      //Comprobar si es cumpleixen o no tots els errors
      if (this.registerForm.valid) {
        const nuevoProfesor: Profesor = {
          id_profe: 0,
          nick: form.username,
          email: form.email,
          pass: form.password,
          nombre: form.nombre,
          apellidos: form.apellidos,
          centro: form.centro,
          tipo: 1,
          imagen: this.imgSrc,
        };
        this.authService.registroProfesor(nuevoProfesor);
      }
    } else {
      //Comprobar si es cumpleixen o no tots els errors
      if (this.registerForm.valid) {
        const nuevoAlumno: Alumno = {
          id_alumno: 0,
          nick: form.username,
          email: form.email,
          pass: form.password,
          nombre: form.nombre,
          apellidos: form.apellidos,
          fecha_nacimiento: form.fechaNacimiento,
          tipo: 0,
          imagen: this.imgSrc,
        };

        console.log(nuevoAlumno);
        this.authService.registroAlumno(nuevoAlumno);
      }
    }
  }
}
