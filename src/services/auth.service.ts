import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/interfaces/User';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const URL_LOGIN = 'http://localhost:8080/identificacion/loginUser.php';
const URL_REGISTRO_ALUMNO = 'http://localhost:8080/alumnos/insertarAlumno.php';
const URL_REGISTRO_PROFESOR = 'http://localhost:8080/profesores/insertarProfesor.php';
const USER_LS = 'userLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user: User) {
    return this.http.post(URL_LOGIN, JSON.stringify(user)).subscribe((val: any) => {
      if (val.resultado == "error") {
        this.generarSwal(val.mensaje);
      } else {
        this.guardarLocalStorage(val.data);
      }
    });
  }

  registroAlumno(user: User) {
    this.http.post(URL_REGISTRO_ALUMNO, JSON.stringify(user)).subscribe((val: any) => {
      if (val.resultado == 'error') {
        this.generarSwal(val.mensaje);
      } else {
        this.guardarLocalStorage(val.data);
      }
    });
  }

  registroProfesor(user: User) {
    return this.http.post(URL_REGISTRO_PROFESOR, JSON.stringify(user)).subscribe((val: any) => {
      if (val.resultado == 'error') {
        this.generarSwal(val.mensaje);
      } else {
        this.guardarLocalStorage(val.data);
      }
    });
  }

  generarSwal(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    });
  }

  guardarLocalStorage(data: any) {
    if (data.tipo == 0) {
      localStorage.removeItem(USER_LS);
      localStorage.setItem(USER_LS, JSON.stringify(data));
      this.router.navigate(['/perfil']);
    } else {
      localStorage.removeItem(USER_LS);
      localStorage.setItem(USER_LS, JSON.stringify(data));
      this.router.navigate(['/perfilprofesor']);
    }
  }
}
