import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from 'app/interfaces/Profesor';
import { Alumno } from 'app/interfaces/Alumno';
import { User } from 'app/interfaces/User';

const URL = 'http://localhost:8080/';

// URLS CRUD ALUMNOS
const URL_CREATE_ALUMNOS = 'http://localhost:8080/alumnos/insertarAlumno.php';  // create
const URL_READ_ALUMNOS = 'http://localhost:8080/alumnos/datosAlumno.php';       // read
const URL_UPDATE_ALUMNOS = 'http://localhost:8080/alumnos/modificarAlumno.php'; // update
const URL_DELETE_ALUMNOS = 'http://localhost:8080/alumnos/eliminarAlumno.php';  // delete
const URL_GET_ALUMNO_ID = 'http://localhost:8080/alumnos/getAlumnoId.php';      // obtener alumnos específicos según su ID
const URL_EMAIL_EXISTE_ALUMNOS = 'http://localhost:8080/alumnos/emailExiste.php';      // comprobar si un email ya está en uso

// URLS CRUD PROFESORES
const URL_CREATE_PROFESORES = 'http://localhost:8080/profesores/insertarProfesor.php';  // create
const URL_READ_PROFESORES = 'http://localhost:8080/profesores/datosProfesor.php';       // read
const URL_UPDATE_PROFESORES = 'http://localhost:8080/profesores/modificarProfesor.php'; // update
const URL_DELETE_PROFESORES = 'http://localhost:8080/profesores/eliminarProfesor.php';  // delete
const URL_GET_PROFESOR_ID = 'http://localhost:8080/profesores/getProfesorId.php';       // obtener profesores específicos según su ID
const URL_EMAIL_EXISTE_PROFESORES = 'http://localhost:8080/profesores/emailExiste.php';      // comprobar si un email ya está en uso

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  alumnoExiste: boolean = false;
  profesorExiste: boolean = false;

  user: string = "";
  pass: string = "";

  datosAlumno: Alumno = {
    id_alumno: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date(),
    tipo: 0,
    imagen: ''
  }

  datosProfesor: Profesor = {
    id_profe: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0,
    tipo: 1,
    imagen: ''
  }

  constructor(private http: HttpClient) { }

  // funciones alumnos
  // create alumno
  insertarAlumno(alumno: Alumno) {
    return this.http.post(URL_CREATE_ALUMNOS, JSON.stringify(alumno));
  }

  // read alumno
  obtenerAlumnos() {
    return this.http.get(URL_READ_ALUMNOS);
  }

  // update alumno
  modificarAlumno(user: User) {
    return this.http.put(URL_UPDATE_ALUMNOS, JSON.stringify(user));
  }
  // delete alumno
  eliminarAlumno() {
    return this.http.get(URL_DELETE_ALUMNOS);
  }

  // obtener alumnos específicos según su ID
  obtenerAlumnoPorId(id: number) {
    return this.http.get(URL_GET_ALUMNO_ID +`?id=${id}`);
  }

  validarEmailExisteAlumnos(email: string) {
    return this.http.get(URL_EMAIL_EXISTE_ALUMNOS + `?email=${email}`);
  }

  // funciones profesores
  // create profesores
  insertarProfesores(alumno: Alumno) {
    return this.http.post(URL_CREATE_PROFESORES, JSON.stringify(alumno));
  }

  // read profesores
  obtenerProfesores() {
    return this.http.get(URL_READ_PROFESORES);
  }

  // update profesores
  modificarProfesor(user: User) {
    return this.http.put(URL_UPDATE_PROFESORES, JSON.stringify(user));
  }
  // delete profesores
  eliminarProfesor() {
    return this.http.get(URL_DELETE_PROFESORES);
  }

  // obtener profesores específicos según su ID
  obtenerProfesorPorId(id: number) {
    return this.http.get(URL_GET_PROFESOR_ID +`?id=${id}`);
  }

  validarEmailExisteProfesores(email: string) {
    return this.http.get(URL_EMAIL_EXISTE_PROFESORES + `?email=${email}`);
  }
}
