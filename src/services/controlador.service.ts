import { Injectable } from '@angular/core';

//importamos httpCliente para poder enviar datos de un lado a otro
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Profesor } from 'app/interfaces/Profesor';
import { Alumno } from 'app/interfaces/Alumno';

@Injectable({
  providedIn: 'root'
})
export class ControladorService {

  URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  obtenerDatosProfesor(): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.URL}datosProfesor.php`);
  }

  obtenerDatosAlumno() {
    return this.http.get<Alumno>(`${this.URL}datosAlumno.php`);
  }

  insertarProfesor(profe: Profesor) {
    return this.http.post(`${this.URL}insertarProfesor.php`, JSON.stringify(profe)).subscribe
      (
        (val) => {
          console.log("POST call successful value returned in body",
            val);
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
