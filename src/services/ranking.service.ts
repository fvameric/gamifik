import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ranking } from 'app/interfaces/Ranking';
import { Alumno } from 'app/interfaces/Alumno';

const URL = 'http://localhost:8080/';

// URLS CRUD RANKINGS
const URL_CREATE_RANK = 'http://localhost:8080/rankings/insertarRanking.php';     // create
const URL_READ_RANK = 'http://localhost:8080/rankings/datosRanking.php';          // read
const URL_UPDATE_RANK = 'http://localhost:8080/rankings/modificarRanking.php';    // update
const URL_DELETE_RANK = 'http://localhost:8080/rankings/eliminarRanking.php';     // delete
const URL_GET_RANK_ID = 'http://localhost:8080/rankings/getRankingId.php';        // obtener rankings específicos según su ID

const URL_RANK_ENTREGAS = 'http://localhost:8080/rankings/getRankEntregas.php';   // obtener relacion rankings - entregas
const URL_RANK_ALUMNOS = 'http://localhost:8080/rankings/getRankAlumnos.php';     // obtener relacion rankings - alumnos
const URL_RANK_ALUMNOS_ID = 'http://localhost:8080/rankings/getRankAlumnosId.php';// obtener relacion rankings - id de alumno
const URL_RANK_PROFES = 'http://localhost:8080/rankings/getRankProfes.php';       // obtener relacion rankings - profes
const URL_RANK_PROFES_ID = 'http://localhost:8080/rankings/getRankProfesId.php';  // obtener relacion rankings - id de profesor

const URL_RANK_JOIN_ALUMNOS = 'http://localhost:8080/rankings/getRankAlumnoId.php';      // obtener inner join ranking rank_alumnos

const URL_INSERT_RANK_ALUMNOS = 'http://localhost:8080/rankings/insertarAlumnoEnRanking.php';      // insertar alumnos y rankings

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) { }

  // funciones rankings
  // create ranking
  insertarRanking(rank: Ranking) {

    return this.http.post(URL_CREATE_RANK, JSON.stringify(rank));
  }

  // read ranking
  obtenerRanking() {
    return this.http.get(URL_READ_RANK);
  }

  // update ranking
  modificarRanking(rank: Ranking) {
    return this.http.put(URL_UPDATE_RANK, JSON.stringify(rank));
  }

  // delete ranking
  eliminarRanking() {
    return this.http.get(URL_DELETE_RANK);
  }

  // obtener rankings específicos según su ID
  obtenerRankingPorId(id: number) {
    return this.http.get(URL_GET_RANK_ID + `?id=${id}`);
  }

  // obtener ranking - entregas
  obtenerRankingEntregas() {
    return this.http.get(URL_RANK_ENTREGAS);
  }

  // obtener ranking - alumnos
  obtenerRankingAlumnos() {
    return this.http.get(URL_RANK_ALUMNOS);
  }

  // obtener ranking - alumnos
  obtenerRankingAlumnosId(id: number) {
    return this.http.get(URL_RANK_ALUMNOS_ID + `?id=${id}`);
  }

  // obtener ranking - profes
  obtenerRankingProfes(id: number) {
    return this.http.get(URL_RANK_PROFES);
  }

  // obtener ranking - alumnos
  obtenerRankingProfeId(id: number) {
    return this.http.get(URL_RANK_PROFES_ID + `?id=${id}`);
  }

  obtenerJoinRankingAlumno() {
    return this.http.get(URL_RANK_JOIN_ALUMNOS);
  }

  insertarAlumnoEnRanking(id_rank: number, id_alumno: number) {
    var ids = {
      "id_rank": id_rank,
      "id_alumno": id_alumno
    }
    return this.http.post(URL_INSERT_RANK_ALUMNOS, JSON.stringify(ids));
  }
}
