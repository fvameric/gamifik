import { Injectable } from '@angular/core';

//importamos httpCliente para poder enviar datos de un lado a otro
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Profesor } from 'app/interfaces/profesor';
import { Alumno } from 'app/interfaces/alumno';

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
}
