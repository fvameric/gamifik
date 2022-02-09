import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import Swal from 'sweetalert2';

// imports conectividad
import { HttpClient } from '@angular/common/http';
import { ControladorService } from 'services/controlador.service';

// interfaces
import { Profesor } from 'app/interfaces/Profesor';
import { Alumno } from 'app/interfaces/Alumno';

import { Router } from '@angular/router';
import { User } from 'app/interfaces/User';
import { AuthService } from 'services/auth.service';
import { TokenService } from 'services/token.service';

const USER_LS = 'userLocalStorage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // variables formulario
  loginForm!: FormGroup;

  passShown: boolean = false;
  passType: string = 'password';

  submitted: boolean = false;
  alumnoExiste: boolean = false;
  userNoExiste: boolean = false;

  alumnos: any;
  datosUser: User = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date(),
    centro: 0,
    tipo: 1,
  };

  constructor(
    public formBuilder: FormBuilder,
    private controladorService: ControladorService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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
    this.authService.loginUser(user).subscribe((val) => {
      if (val != null) {
        // to-do
        //this.tokenService.saveToken(val.accessToken)
        this.datosUser = val;
        localStorage.removeItem(USER_LS);
        localStorage.setItem(USER_LS, JSON.stringify(this.datosUser)
        );
        this.router.navigate(['/perfil']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de identificación',
          text: 'Este usuario no existe',
        });
      }
    });
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
