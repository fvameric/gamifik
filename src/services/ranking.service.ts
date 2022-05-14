import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ranking } from 'app/interfaces/Ranking';
import { Alumno } from 'app/interfaces/Alumno';
import { map, take } from 'rxjs/operators';
import { Entrega } from '../app/interfaces/Entrega';

const URL_LOCALHOST = 'http://localhost:8888/';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  
  constructor(private http: HttpClient) {}

  /*******************
  *                   *
  *                   *
  *                   *
  *     RANKINGS      *
  *                   *
  *                   *
  *                   *
  ********************/

  // create ranking
  insertarRanking(rank: Ranking) {
    console.log(rank);
    return this.http.post(this.concatUrl('rankings/insertarRanking.php'), JSON.stringify(rank));
  }

  // read ranking
  obtenerRanking() {
    return this.http.get(this.concatUrl('rankings/datosRanking.php'));
  }

  // update ranking
  modificarRanking(rank: Ranking) {
    return this.http.put(this.concatUrl('rankings/modificarRanking.php'), JSON.stringify(rank));
  }

  // delete ranking
  eliminarRanking(id: number) {
    return this.http.delete(this.concatUrl('rankings/eliminarRanking.php') + `?id=${id}`);
  }

  /*******************
  *                   *
  *                   *
  *                   *
  *     RANKINGS      *
  *     ALUMNOS       *
  *                   *
  *                   *
  ********************/

  obtenerJoinRankingAlumno() {
    return this.http.get(this.concatUrl('rankings/alumnos/getRankAlumnoId.php'));
  }

  insertarAlumnoEnRanking(id_rank: number, id_alumno: number) {
    var ids = {
      id_rank: id_rank,
      id_alumno: id_alumno,
    };
    return this.http.post(this.concatUrl('rankings/alumnos/insertarAlumnoEnRanking.php'), JSON.stringify(ids));
  }

  // obtener alumnos por codigo de ranking
  obtenerAlumnoPorRanking(id: number) {
    return this.http.get<any[]>(this.concatUrl('rankings/alumnos/getAlumnoPorRanking.php') + `?id=${id}`);
  }

  obtenerAlumnoPorRankingApellido(id_rank: number, id_entrega: number) {
    var ids = {
      id_rank: id_rank,
      id_entrega: id_entrega,
    };
    return this.http.post<any[]>(this.concatUrl('rankings/alumnos/getAlumnoApellidos.php'), JSON.stringify(ids));
  }

  // quitar alumno del ranking
  quitarAlumnoRanking(id_rank: number, id_alumno: number) {
    var ids = {
      id_rank: id_rank,
      id_alumno: id_alumno,
    };
    return this.http.post(this.concatUrl('rankings/alumnos/quitarAlumnoRanking.php'), JSON.stringify(ids));
  }

  aceptarAlumnosPendientes(alumno: any) {
    return this.http.post(this.concatUrl('rankings/alumnos/alumnosPendientes.php'), JSON.stringify(alumno));
  }

  eliminarAlumnosPendientes(alumno: any) {
    return this.http.post(this.concatUrl('rankings/alumnos/eliminarAlumnosPendientes.php'), JSON.stringify(alumno)
    );
  }

  checkAlumnoAceptado(alumno: any) {
    return this.http.post(this.concatUrl('rankings/alumnos/checkAlumnoAceptado.php'), JSON.stringify(alumno));
  }

  modificarRankAlumnos(alumno: any) {
    console.log(alumno);
    return this.http.post(this.concatUrl('rankings/alumnos/modificarRankAlumnos.php'), JSON.stringify(alumno));
  }

  /*******************
  *                   *
  *                   *
  *                   *
  *     RANKINGS      *
  *     PROFESORES    *
  *                   *
  *                   *
  ********************/

  // obtener profesor - rankings
  obtenerProfeRankId(id: number) {
    return this.http.get(this.concatUrl('rankings/profesores/getProfeRankId.php') + `?id=${id}`);
  }

  obtenerJoinRankingProfes() {
    return this.http.get(this.concatUrl('rankings/profesores/getRankProfesorId.php'));
  }

  insertarProfeEnRanking(id_rank: number, id_profe: number) {
    var ids = {
      id_rank: id_rank,
      id_profe: id_profe,
    };
    return this.http
      .post(this.concatUrl('rankings/profesores/insertarProfesorRanking.php'), JSON.stringify(ids))
      .pipe(take(1));
  }

  validarNombreExisteRanking(idProfe: number, nombreRanking: string) {
    return this.http.get(this.concatUrl('rankings/profesores/obtenerNombreRanking.php') + `?nom_rank=${nombreRanking}&id_profe=${idProfe}`
    );
  }

  // concatena la URL de localhost y la string que le pasemos
  concatUrl(urlStr: string) {
    return URL_LOCALHOST + urlStr;
  }
}
