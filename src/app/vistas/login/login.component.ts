import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

// imports conectividad
import { HttpClient } from '@angular/common/http';
import { ControladorService } from 'services/controlador.service';

// interfaces
import { Profesor } from 'app/interfaces/Profesor';
import { Alumno } from 'app/interfaces/Alumno';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variables formulario
  loginForm!: FormGroup;
  passwordShown: boolean = false;
  passwordType: string = 'password';
  submitted: boolean = false;

  profeExiste: Boolean = false;

  constructor(public formBuilder: FormBuilder, private controladorService: ControladorService, private http: HttpClient) { }

  profesores: any;

  datosProfesor: Profesor = {
    _id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0
  }

  datosAlumno: Alumno = {
    _id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date,
    avatar: '',
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]]
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
    this.submitted = true;

    this.controladorService.obtenerDatosProfesor()
    .subscribe((datos: any) => {
      this.profesores = datos;
      this.profesores.forEach((element: any) => {
        console.log(element.nick);
      });
      /*
      if (form.username == datos.nick && form.password == datos.pass) {
          this.profeExiste = true;
        }
      
      if (this.profeExiste) {
        alert("login");
      }else {
        alert("no login");
      }
      */
    });

    this.onReset();
  }

  public togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';

    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }


}
