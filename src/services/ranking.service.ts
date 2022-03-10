import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ranking } from 'app/interfaces/Ranking';
import { Alumno } from 'app/interfaces/Alumno';
import { map, take } from 'rxjs/operators';
import { Entrega } from '../app/interfaces/Entrega';

const URL = 'http://localhost:8080/';

// URLS CRUD RANKINGS
const URL_CREATE_RANK = 'http://localhost:8080/rankings/insertarRanking.php';     // create
const URL_READ_RANK = 'http://localhost:8080/rankings/datosRanking.php';          // read
const URL_UPDATE_RANK = 'http://localhost:8080/rankings/modificarRanking.php';    // update
const URL_DELETE_RANK = 'http://localhost:8080/rankings/eliminarRanking.php';     // delete
const URL_GET_RANK_ID = 'http://localhost:8080/rankings/getRankingId.php';        // obtener rankings específicos según su ID
const URL_NOMBRE_EXISTE_RANKING = 'http://localhost:8080/rankings/profesores/obtenerNombreRanking.php';      // Obtener nombre ranking
const URL_CONTAR_RANKINGS = 'http://localhost:8080/rankings/contarRankings.php'; // Contar el numero total de rankings

// ENTREGAS
const URL_NOMBRE_EXISTE_PRACTICA = 'http://localhost:8080/rankings/profesores/obtenerNombrePractica.php';
const URL_RANK_ENTREGAS = 'http://localhost:8080/rankings/getRankEntregas.php';   // obtener relacion rankings - entregas
const URL_CREATE_ENTREGA = 'http://localhost:8080/rankings/insertarEntrega.php';

// ALUMNOS
const URL_RANK_ALUMNOS = 'http://localhost:8080/rankings/alumnos/getRankAlumnos.php';     // obtener relacion rankings - alumnos
const URL_RANK_ALUMNOS_ID = 'http://localhost:8080/rankings/alumnos/getRankAlumnosId.php';// obtener relacion rankings - id de alumno
const URL_ALUMNOS_POR_RANK = 'http://localhost:8080/rankings/alumnos/getAlumnoPorRanking.php';      // obtener alumnos via ranking id
const URL_RANK_JOIN_ALUMNOS = 'http://localhost:8080/rankings/alumnos/getRankAlumnoId.php';      // obtener inner join ranking rank_alumnos
const URL_INSERT_RANK_ALUMNOS = 'http://localhost:8080/rankings/alumnos/insertarAlumnoEnRanking.php';      // insertar alumnos y rankings

// PROFESORES
const URL_RANK_PROFES = 'http://localhost:8080/rankings/profesores/getRankProfes.php';       // obtener relacion rankings - profes
const URL_RANK_PROFES_ID = 'http://localhost:8080/rankings/profesores/getRankProfesId.php';  // obtener relacion rankings - id de profesor
const URL_RANK_JOIN_PROFES = 'http://localhost:8080/rankings/profesores/getRankProfesorId.php';      // obtener inner join ranking rank_profes
const URL_INSERT_RANK_PROFES = 'http://localhost:8080/rankings/profesores/insertarProfesorRanking.php';      // insertar alumnos y rankings

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) { }

  // funciones rankings
  // create ranking
  insertarRanking(rank: Ranking) {
    console.log(rank);
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

  contarRankings(){
    return this.http.get(URL_CONTAR_RANKINGS);
  }

  // delete ranking
  eliminarRanking(id: number) {
    return this.http.delete(URL_DELETE_RANK + `?id=${id}`);
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
  obtenerRankingProfes() {
    return this.http.get(URL_RANK_PROFES);
  }

  // obtener ranking - alumnos
  obtenerRankingProfeId(id: number) {
    return this.http.get(URL_RANK_PROFES_ID + `?id=${id}`);
  }

  obtenerJoinRankingAlumno() {
    return this.http.get(URL_RANK_JOIN_ALUMNOS);
  }

  obtenerJoinRankingProfes() {
    return this.http.get(URL_RANK_JOIN_PROFES);
  }

  insertarAlumnoEnRanking(id_rank: number, id_alumno: number) {
    var ids = {
      "id_rank": id_rank,
      "id_alumno": id_alumno
    }
    return this.http.post(URL_INSERT_RANK_ALUMNOS, JSON.stringify(ids));
  }

  insertarProfeEnRanking(id_rank: number, id_profe: number) {
    var ids = {
      "id_rank": id_rank,
      "id_profe": id_profe
    }
    return this.http.post(URL_INSERT_RANK_PROFES, JSON.stringify(ids)).pipe(
      take(1));
  }

  // obtener alumnos por codigo de ranking
  obtenerAlumnoPorRanking(id: number) {
    return this.http.get<any[]>(URL_ALUMNOS_POR_RANK +`?id=${id}`);
  }


  validarNombreExisteRanking(idProfe: number, nombreRanking:string,) {
    return this.http.get(URL_NOMBRE_EXISTE_RANKING + `?nom_rank=${nombreRanking}&id_profe=${idProfe}`);
  }

  //
  validarNombreExistePractica(idProfe: number, nombrePractica:string){
    return this.http.get(URL_NOMBRE_EXISTE_PRACTICA + `?nom_practica=${nombrePractica}&id_profe=${idProfe}`);
  }

  insertarPractica(entrega:Entrega){
    
    
    return this.http.post(URL_CREATE_ENTREGA, JSON.stringify(entrega));
  }
}
