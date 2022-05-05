import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/interfaces/User';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { AuthService } from 'services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // 1. pipe takeUntil
  private subject = new Subject();
  // 2. objecto Suscription
  private logProfSub = new Subscription();

  // variables formulario
  loginForm!: FormGroup;

  passShown: boolean = false;
  passType: string = 'password';

  submitted: boolean = false;
  alumnoExiste: boolean = false;
  userNoExiste: boolean = false;

  alumnos: any;


  // variables token
  userRoles: any;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    // 1. pipe takeUntil para unsuscribe en ngOnDestroy
    this.subject.next();
    this.subject.complete();

    // 2. Unsuscribe del objecto Suscription
    this.logProfSub.unsubscribe();
  }

  //Funció rebre valors del formulari
  get form() {
    return this.loginForm.controls;
  }

  //Funció resetejar valors
  onReset() {
    this.loginForm.reset();
  }

  //Funció iniciar sessió
  onLogin(form: any) {
    const user: User = {
      nick: form.username,
      pass: form.password,
    };
    this.submitted = true;

    if (this.loginForm.valid) {
      if (this.router.url == '/identificacion') {

        // 1. pipe takeUntil para unsuscribe en ngOnDestroy
        this.authService.loginAlumnos(user)
          .pipe(
            takeUntil(this.subject),
            catchError(err => throwError(err))
          ).subscribe(val => {
            this.authService.guardarLocalStorage(val);
          });

      } else if (this.router.url == '/identificacion-profesores') {

        // 2. suscription, unsuscribe manual en ngondestroy
        this.logProfSub = this.authService.loginProfesores(user).subscribe({
          next: val => this.authService.guardarLocalStorage(val),
          complete: () => console.log('logProfSub complete'),
          error: val => console.log(`Error: ${val}`)
        });
      }
    }
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

  cambiarButton(): void { 
    document.getElementsByClassName('toggle')[0].classList.toggle('dark');
    document.getElementsByClassName('toggle')[0].classList.toggle('active');

    document.getElementsByClassName('hola')[0].classList.toggle('dark');
    document.getElementsByClassName('toggle')[0].classList.toggle('active');
  }
}
