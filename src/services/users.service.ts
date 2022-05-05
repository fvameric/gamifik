import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from 'app/interfaces/Profesor';
import { Alumno } from 'app/interfaces/Alumno';
import { User } from 'app/interfaces/User';

const URL_LOCALHOST = 'http://localhost:8888/';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  alumnoExiste: boolean = false;
  profesorExiste: boolean = false;

  user: string = '';
  pass: string = '';

  datosAlumno: Alumno = {
    id_alumno: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: new Date(),
    tipo: 0,
    imagen: '',
  };

  datosProfesor: Profesor = {
    id_profe: 0,
    nick: '',
    email: '',
    pass: '',
    nombre: '',
    apellidos: '',
    centro: 0,
    tipo: 1,
    imagen: '',
  };

  constructor(private http: HttpClient) { }

  // funciones alumnos
  // create alumno
  insertarAlumno(alumno: Alumno) {
    return this.http.post(this.concatUrl('alumnos/insertarAlumno.php'), JSON.stringify(alumno));
  }

  // read alumno
  obtenerAlumnos() {
    return this.http.get(this.concatUrl('alumnos/datosAlumno.php'));
  }

  // update alumno
  modificarAlumno(user: User) {
    return this.http.put(this.concatUrl('alumnos/modificarAlumno.php'), JSON.stringify(user));
  }
  // delete alumno
  eliminarAlumno() {
    return this.http.get(this.concatUrl('alumnos/eliminarAlumno.php'));
  }

  // obtener alumnos específicos según su ID
  obtenerAlumnoPorId(id: number) {
    return this.http.get(this.concatUrl('alumnos/getAlumnoId.php') + `?id=${id}`);
  }
  // validar email alumnos
  validarEmailExisteAlumnos(email: string) {
    return this.http.get(this.concatUrl('alumnos/emailExiste.php') + `?email=${email}`);
  }
  // validar username alumnos
  validarUsuarioExisteAlumnos(username: string) {
    return this.http.get(this.concatUrl('alumnos/usuarioExiste.php') + `?username=${username}`);
  }
  // validar pass alumnos
  validarPassAlumnos(pass: string, id: number) {
    var user = {
      "pass": pass,
      "id": id
    }
    return this.http.post(this.concatUrl('alumnos/passExiste.php'), JSON.stringify(user));
  }
  
  // funciones profesores
  // create profesores
  insertarProfesores(alumno: Alumno) {
    return this.http.post(this.concatUrl('profesores/insertarProfesor.php'), JSON.stringify(alumno));
  }

  // read profesores
  obtenerProfesores() {
    return this.http.get(this.concatUrl('profesores/datosProfesor.php'));
  }

  // update profesores
  modificarProfesor(user: User) {
    return this.http.put(this.concatUrl('profesores/modificarProfesor.php'), JSON.stringify(user));
  }
  // delete profesores
  eliminarProfesor() {
    return this.http.get(this.concatUrl('profesores/eliminarProfesor.php'));
  }

  // obtener profesores específicos según su ID
  obtenerProfesorPorId(id: number) {
    return this.http.get(this.concatUrl('profesores/getProfesorId.php') + `?id=${id}`);
  }

  //validar email profes
  validarEmailExisteProfes(email: string) {
    return this.http.get(this.concatUrl('profesores/emailExiste.php') + `?email=${email}`);
  }
  // validar username profes
  validarUsuarioExisteProfes(username: string) {
    return this.http.get(this.concatUrl('profesores/usuarioExiste.php') + `?username=${username}`);
  }

  // validar pass profes
  validarPassProfes(pass: string, id: number) {
    var user = {
      "pass": pass,
      "id": id
    }
    return this.http.post(this.concatUrl('profesores/passExiste.php'), JSON.stringify(user));
  }

  // concatena la URL de localhost y la string que le pasemos
  // ejemplo: "http://localhost:8888/string"
  concatUrl(urlStr: string) {
    return URL_LOCALHOST + urlStr;
  }
}
