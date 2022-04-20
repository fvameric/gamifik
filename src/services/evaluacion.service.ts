import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const URL_CREATE_EVALUACION = 'http://localhost:8080/evaluaciones/crearEvaluacion.php'; // create

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(private http: HttpClient) { }

  insertarEvaluacion(evaluacion: any) {
    console.log(evaluacion);
    return this.http.post(URL_CREATE_EVALUACION, JSON.stringify(evaluacion));
  }
}
