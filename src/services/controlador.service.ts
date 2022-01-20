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
    const jsonData = '{"id": "0", "nick": "asd", "email": "asd@gmail.com", "pass": "asd","nombre": "asd", "apellidos": "asd", "centro": "asd"}';
    console.log(jsonData);
    return this.http.post<any>(`${this.URL}insertarProfesor.php`, jsonData);
    //return this.http.post(`${this.URL}insertarProfesor.php`, JSON.stringify(profe));
  }

  eliminarProfesor(idProfesor: number) {
    return this.http.get(`${this.URL}eliminarProfesor.php?id=${idProfesor}`)
  }

  // TO-DO modificar profe
}
