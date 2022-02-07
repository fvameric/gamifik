import { Injectable } from '@angular/core';

//importamos httpCliente para poder enviar datos de un lado a otro
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { Profesor } from 'app/interfaces/Profesor';
import { Alumno } from 'app/interfaces/Alumno';
import { Router } from '@angular/router';
import { User } from 'app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class ControladorService {

  URL = 'http://localhost:8080/';

  alumnoExiste: boolean = false;
  profesorExiste: boolean = false;
  subs: Subscription = new Subscription;

  user: string = "";
  pass: string = "";

  datosAlumno: Alumno = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date(),
    tipo: 0
  }

  datosProfesor: Profesor = {
    id: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0,
    tipo: 1
  }

  constructor(private http: HttpClient, private router: Router) { }

  obtenerDatosProfesor(): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.URL}profesores/datosProfesor.php`);
  }

  obtenerDatosAlumno(): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.URL}alumnos/datosAlumno.php`);
  }

  loginUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.URL}identificacion/loginUser.php`, JSON.stringify(user));
  }

  obtenerPerfilAlumno() {
    return this.datosAlumno;
  }

  obtenerPerfilProfesor() {
    return this.datosProfesor;
  }

  insertarAlumno(alumno: Alumno) {
    return this.http.post(`${this.URL}alumnos/insertarAlumno.php`, JSON.stringify(alumno)).subscribe
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
    return this.http.post(`${this.URL}profesores/insertarProfesor.php`, JSON.stringify(profe)).subscribe
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
    return this.http.get(`${this.URL}profesores/eliminarProfesor.php?id=${idProfesor}`)
  }

  // TO-DO modificar profe
}
