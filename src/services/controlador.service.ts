import { Injectable } from '@angular/core';

//importamos httpCliente para poder enviar datos de un lado a otro
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Profesor } from 'app/interfaces/Profesor';
import { Alumno } from 'app/interfaces/Alumno';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ControladorService {

  URL = 'http://localhost:8080/';
  alumnoExiste: boolean = false;
  profesorExiste: boolean = false;

  datosAlumno: Alumno = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date()
  }

  datosProfesor: Profesor = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0
  }

  constructor(private http: HttpClient, private router: Router) { }

  obtenerDatosProfesor(): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.URL}datosProfesor.php`);
  }

  obtenerDatosAlumno() {
    return this.http.get<Alumno>(`${this.URL}datosAlumno.php`);
  }

  validarLoginAlumno(form: any) {
    this.obtenerDatosAlumno().subscribe((datos: any) => {
        datos.forEach((element: any) => {
          if (form.username == element.nick && form.password == element.pass) {
            this.alumnoExiste = true;
          }

          // TO-DO guardar sesión
          // esto no funciona como debería
          if (this.alumnoExiste) {
            this.alumnoExiste = false;
            this.datosAlumno.id = element.id;
            this.datosAlumno.nick = element.nick;
            this.datosAlumno.email = element.email;
            this.datosAlumno.pass = element.pass;
            this.datosAlumno.nombre = element.nombre;
            this.datosAlumno.apellidos = element.apellidos;
            this.datosAlumno.fecha_nacimiento = element.fecha_nacimiento;
            this.router.navigateByUrl('/dashboard');
          }
        });
        if (!this.alumnoExiste) {
          alert("Login incorrecto");
      }
      });
  }

  obtenerPerfilAlumno() {
    return this.datosAlumno;
  }

  validarLoginProfesor(form: any) {
    this.obtenerDatosProfesor().subscribe((datos: any) => {
        datos.forEach((element: any) => {
          if (form.username == element.nick && form.password == element.pass) {
            this.profesorExiste = true;
          }

          // TO-DO guardar sesión
          // esto no funciona como debería
          if (this.profesorExiste) {
            this.datosProfesor.id = element.id;
            this.datosProfesor.nick = element.nick;
            this.datosProfesor.email = element.email;
            this.datosProfesor.pass = element.pass;
            this.datosProfesor.nombre = element.nombre;
            this.datosProfesor.apellidos = element.apellidos;
            this.datosProfesor.centro = element.centro;
            this.router.navigateByUrl('/dashboardProfesor');
          }
        });
        if (!this.profesorExiste) {
          alert("Login incorrecto");
      }
      });
  }

  obtenerPerfilProfesor() {
    return this.datosProfesor;
  }

  insertarAlumno(alumno: Alumno) {
    return this.http.post(`${this.URL}insertarAlumno.php`, JSON.stringify(alumno)).subscribe
      (
        (val) => {
          console.log("POST call successful value returned in body", val);
          // TO-DO guardar sesión y login si ha sido correcto
          this.router.navigateByUrl('/dashboard');
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  insertarProfesor(profe: Profesor) {
    return this.http.post(`${this.URL}insertarProfesor.php`, JSON.stringify(profe)).subscribe
      (
        (val) => {
          console.log("POST call successful value returned in body", val);
          // TO-DO guardar sesión y  login si ha sido correcto
          this.router.navigateByUrl('/dashboardProfesor');
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  eliminarProfesor(idProfesor: number) {
    return this.http.get(`${this.URL}eliminarProfesor.php?id=${idProfesor}`)
  }

  // TO-DO modificar profe
}
