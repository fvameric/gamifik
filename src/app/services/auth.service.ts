import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'app/interfaces/User';

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
        Swal.fire({
          icon: 'error',
          title: 'Error de identificación',
          text: val.mensaje,
        });
      } else {
        localStorage.removeItem(USER_LS);
        localStorage.setItem(USER_LS, JSON.stringify(val.data));
        this.router.navigate(['/perfil']);
      }
    });
  }

  registroAlumno(user: User) {
    return this.http.post(URL_REGISTRO_ALUMNO, JSON.stringify(user)).subscribe((val: any) => {
      if (val.resultado == 'error') {
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: val.mensaje,
        });
      } else {
        /*
        localStorage.removeItem(USER_LS);
        localStorage.setItem(USER_LS, JSON.stringify(val.data));
        this.router.navigate(['/perfil']);
        */
      }
    });
  }

  registroProfesor(user: User) {
    return this.http.post(URL_REGISTRO_PROFESOR, JSON.stringify(user)).subscribe((val: any) => {
      if (val.resultado == 'error') {
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: val.mensaje,
        });
      } else {
        /*
        localStorage.removeItem(USER_LS);
        localStorage.setItem(USER_LS, JSON.stringify(val.data));
        this.router.navigate(['/perfil']);
        */
      }
    });
    
  }
}
