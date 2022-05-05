import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { Alumno } from 'app/interfaces/Alumno';
import { Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from 'services/auth/auth.service';
import { UsersService } from 'services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.css'],
})
export class RegistroAlumnoComponent implements OnInit {
  private subject = new Subject();
  
  // formulario
  registerForm!: FormGroup;

  // flags del formulario
  submitted: boolean = false;
  passShown: boolean = false;
  confirmPassShown: boolean = false;

  // para mostrar la contraseña introducida en el input
  passType: string = 'password';
  confirmPassType: string = 'password';

  // input para acceder como profesor
  passAcceso: string = '';

  // avatar por defecto al registrarse
  imgSrc: string = '/assets/avatardefault.png';

  //validaciones para fechas
  minDate: Date = new Date();
  currentDate: Date = new Date();

  // wait for interval to end
  pendingName: boolean = false;
  pendingEmail: boolean = false;

  constructor(
    private usersService: UsersService,
    public formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.crearFormulario();

    //Comprueba que el correo electrónico y nombre user no se repitan
    this.checkEmail();
    this.checkUsername();

    this.currentDate = new Date();
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
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(email => this.usersService.validarEmailExisteAlumnos(email)),
      takeUntil(this.subject)
    ).subscribe((val: any) => {
      this.pendingEmail = true;
      setTimeout(() => {
        if (val.resultado == 'error') {
          this.email.setErrors({ notUnique: true });
        }
        this.pendingEmail = false;
      }, 600);
    });
    /*
    this.email.valueChanges.subscribe((email) => {
      this.usersService
        .validarEmailExisteAlumnos(email)
        .subscribe((val: any) => {
          if (val.resultado == 'error') {
            this.email.markAsPending({ onlySelf: false });
            this.email.setErrors({ notUnique: true });
          }
        });
    });
    */
  }

  // Disponibilidad usuario
  checkUsername() {
    this.username.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(nom => this.usersService.validarUsuarioExisteAlumnos(nom)),
      takeUntil(this.subject)
    ).subscribe((val: any) => {
      this.pendingName = true;
      setTimeout(() => {
        if (val.resultado == 'error') {
          this.username.setErrors({ notUnique: true });
        }
        this.pendingName = false;
      }, 600);
    });
    /*
    this.username.valueChanges.subscribe((username) => {
      this.usersService
        .validarUsuarioExisteAlumnos(username)
        .subscribe((val: any) => {
          if (val.resultado == 'error') {
            //this.username.markAsPending({ onlySelf: false });
            this.username.setErrors({ notUnique: true });
          }
        });
    });
    */
  }

  crearFormulario() {
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
          [
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(64),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
          ],
        ],
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        ],
        apellidos: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        ],
        fechaNacimiento: ['', Validators.required],
        userImage: [''],
      },
      {
        //Validador que passa a la funció MustMatch els valors de 'password' i de 'confirmPassword' per a comparar-los i verificar-los
        validator: [
          this.mustMatch('password', 'confirmPassword'), // Validación contraseñas iguales
          this.ageCheck('fechaNacimiento'), // Validación edad
        ],
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

  // Chequear la edad
  ageCheck(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control?.errors && !control.errors['ageCheck']) {
        return;
      }

      if (
        this.getAge(control?.value) <= 1 || // Que deba tener un año o mas
        this.getAge(control?.value) > 120 // Que no pueda tener mas de 120 años
      ) {
        control.setErrors({ ageCheck: true });
      } else {
        control.setErrors(null);
      }
    };
  }

  // Sacar la edad
  getAge(fecha: string): number {
    let today = new Date();
    let fechaNacimiento = new Date(fecha);
    let edad = today.getFullYear() - fechaNacimiento.getFullYear();
    let mes = today.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && today.getDate() > fechaNacimiento.getDate())) {
      edad--;
    }

    return edad;
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

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type.indexOf('image') == 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => (this.imgSrc = e.target.result);
        reader.readAsDataURL(file);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor elige una imagen',
        });
      }
    }
  }

  //Funció que executa quan s'apreta el botó registre
  onRegistro(form: any) {
    this.submitted = true;

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
      this.authService.registroAlumno(nuevoAlumno);
    }
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }
}
