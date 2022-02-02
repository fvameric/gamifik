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
    return this.http.get<Profesor>(`${this.URL}profesores/datosProfesor.php`);
  }

  obtenerDatosAlumno(): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.URL}alumnos/datosAlumno.php`);
  }

  loginUser(user: User) {
    if (!this.profesorExiste) {
      this.http.post<Alumno[]>(`${this.URL}alumnos/loginAlumno.php`, JSON.stringify(user)).subscribe((val) => {
        if (val) {
          val.forEach(element => {
            this.alumnoExiste = true;
            localStorage.setItem('userLocalStorage', JSON.stringify(element));
            localStorage.setItem('tipoUser', "1");
            this.router.navigate(['/dashboard']);
          });
        }
      });
    }

    if (!this.alumnoExiste) {
      this.http.post<User[]>(`${this.URL}profesores/loginProfesor.php`, JSON.stringify(user)).subscribe((val) => {
        if (val) {
          val.forEach(element => {
            this.profesorExiste = true;
            localStorage.setItem('userLocalStorage', JSON.stringify(element));
            localStorage.setItem('tipoUser', "2");
            this.router.navigate(['/dashboard']);
          });
        }
      });
    }

    this.alumnoExiste = false;
    this.profesorExiste = false;
  }

  obtenerPerfilAlumno() {
    return this.datosAlumno;
  }

  validarLoginProfesor(form: any) {
    this.obtenerDatosProfesor().subscribe((datos: any) => {
      datos.forEach((element: any) => {
        if (form.username == element.nick && form.password == element.pass) {
          this.profesorExiste = true;
          console.log(form.username + " - " + element.nick);
        } else {
          console.log("else: " + form.username + " - " + element.nick);
        }

        // TO-DO guardar sesión
        // esto no funciona como debería
        if (this.profesorExiste) {
          this.ngOnDestroy();
          console.log("profe esta dins");
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
        console.log("profe NO esta");
        alert("Login incorrecto");
      }
    });
  }

  ngOnDestroy() {
    console.log("unsuscribe");
    this.subs.unsubscribe();
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
