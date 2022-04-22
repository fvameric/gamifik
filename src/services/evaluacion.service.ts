import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const URL_CREATE_EVALUACION = 'http://localhost:8080/evaluaciones/crearEvaluacion.php'; // create
const URL_READ_EVALUACIONES = 'http://localhost:8080/evaluaciones/obtenerEvaluaciones.php'; // read

const URL_READ_EVAL_ALUMNO_ID = 'http://localhost:8080/evaluaciones/obtenerEvaluacionAlumnoId.php'; // read
const URL_READ_EVAL_PROFESOR_ID = 'http://localhost:8080/evaluaciones/obtenerEvaluacionProfesorId.php'; // read
const URL_READ_EVAL_RANKING_ID = 'http://localhost:8080/evaluaciones/obtenerEvaluacionRankingId.php'; // read
const URL_READ_EVAL_ALUMNO_RANK_ID = 'http://localhost:8080/evaluaciones/obtenerEvaluacionIds.php'; // read
const URL_READ_EVAL_EVALUADOR_ID = 'http://localhost:8080/evaluaciones/obtenerEvaluacionEvaluadorId.php'; // read
@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(private http: HttpClient) { }

  insertarEvaluacion(evaluacion: any) {
    console.log(evaluacion);
    return this.http.post(URL_CREATE_EVALUACION, JSON.stringify(evaluacion));
  }

  obtenerEval() {
    return this.http.get(URL_READ_EVALUACIONES);
  }

  obtenerEvalAlumnoId(id: number) {
    return this.http.get(URL_READ_EVAL_ALUMNO_ID + `?id=${id}`);
  }

  obtenerEvalProfesorId(ids: any) {
    return this.http.post(URL_READ_EVAL_PROFESOR_ID, JSON.stringify(ids));
  }

  obtenerEvalRankingId(id: number) {
    return this.http.get(URL_READ_EVAL_RANKING_ID + `?id=${id}`);
  }

  obtenerEvalAlumnoRankIds(ids: any) {
    return this.http.post(URL_READ_EVAL_ALUMNO_RANK_ID, JSON.stringify(ids));
  }

  obtenerEvalEvaluadorId(ids: any) {
    console.log(ids);
    return this.http.post(URL_READ_EVAL_EVALUADOR_ID, JSON.stringify(ids));
  }
}
