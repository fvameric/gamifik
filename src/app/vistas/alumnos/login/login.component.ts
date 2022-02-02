import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

// imports conectividad
import { HttpClient } from '@angular/common/http';
import { ControladorService } from 'services/controlador.service';

// interfaces
import { Profesor } from 'app/interfaces/Profesor';
import { Alumno } from 'app/interfaces/Alumno';

import { Router } from '@angular/router';
import { User } from 'app/interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variables formulario
  loginForm!: FormGroup;

  passShown: boolean = false;
  passType: string = 'password';

  submitted: boolean = false;
  alumnoExiste: boolean = false;

  alumnos: any;

  constructor(
    public formBuilder: FormBuilder,
    private controladorService: ControladorService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    }
    );
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
      pass: form.password
    }
    this.submitted = true;
    this.controladorService.loginUser(user);
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
}
