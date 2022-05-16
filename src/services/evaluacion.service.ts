import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL_LOCALHOST = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(private http: HttpClient) { }

  // CREATE Evaluación
  insertarEvaluacion(evaluacion: any) {
    return this.http.post(this.concatUrl('evaluaciones/crearEvaluacion.php'), JSON.stringify(evaluacion));
  }

  // READ Evaluaciones
  obtenerEval() {
    return this.http.get(this.concatUrl('evaluaciones/obtenerEvaluaciones.php'));
  }

  // READ Evaluación mediante la id de profesor
  obtenerEvalProfesorId(ids: any) {
    return this.http.post(this.concatUrl('evaluaciones/obtenerEvaluacionProfesorId.php'), JSON.stringify(ids));
  }

  // READ Evaluación mediante la id del alumno, del ranking y la skill
  obtenerEvalAlumnoRankIds(ids: any) {
    return this.http.post(this.concatUrl('evaluaciones/obtenerEvaluacionIds.php'), JSON.stringify(ids));
  }

  // READ Evaluación mediante la id del alumno evaluador
  obtenerEvalEvaluadorId(ids: any) {
    console.log(ids);
    return this.http.post(this.concatUrl('evaluaciones/obtenerEvaluacionEvaluadorId.php'), JSON.stringify(ids));
  }

  // DELETE Evaluación
  eliminarEvaluacion(id: number) {
    return this.http.delete(this.concatUrl('evaluaciones/eliminarEvaluacion.php') + `?id=${id}`);
  }

  getPuntosSemanales(id_alumno: number) {
    return this.http.get(this.concatUrl('evaluaciones/getPuntosSemanales.php') + `?id_alumno=${id_alumno}`);
  }

  checkFechaPuntosSemanales(id_alumno: number) {
    return this.http.get(this.concatUrl('evaluaciones/checkFechaPuntos.php') + `?id_alumno=${id_alumno}`);
  }

  renovarPuntosSemanales(id_alumno: number) {
    var ids = {
      id_alumno: id_alumno
    }
    return this.http.post(this.concatUrl('evaluaciones/renovarPuntosSemanales.php'), JSON.stringify(ids));
  }

  // concatena la URL de localhost y la string que le pasemos
  concatUrl(urlStr: string) {
    return URL_LOCALHOST + urlStr;
  }
}
