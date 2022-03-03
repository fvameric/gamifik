import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/interfaces/User';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

const URL_LOGIN = 'http://localhost:8080/identificacion/loginUser.php';
const URL_REGISTRO_ALUMNO = 'http://localhost:8080/alumnos/insertarAlumno.php';
const URL_REGISTRO_PROFESOR = 'http://localhost:8080/profesores/insertarProfesor.php';
const USER_LS = 'userLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
    ) { }

  loginUser(user: User) {
    return this.http.post(URL_LOGIN, JSON.stringify(user)).subscribe((val: any) => {
      if (val.resultado == "error") {
        this.generarSwal(val.mensaje);
      } else {
        //this.guardarLocalStorage(val.data);

        this.guardarSessionStorage(val);
      }
    });
  }

  logout() {
    this.tokenService.signOut();
  }

  isAuthenticated(): boolean {
    if (this.tokenService.getToken() != '') {
      return true;
    }
    return false;
  }

  userRole(): number {
    const user = this.tokenService.getUser();
    return user.tipo;
  }

  registroAlumno(user: User) {
    this.http.post(URL_REGISTRO_ALUMNO, JSON.stringify(user)).subscribe((val: any) => {
      if (val.resultado == 'error') {
        this.generarSwal(val.mensaje);
      } else {
        this.guardarSessionStorage(val);
      }
    });
  }

  registroProfesor(user: User) {
    return this.http.post(URL_REGISTRO_PROFESOR, JSON.stringify(user)).subscribe((val: any) => {
      if (val.resultado == 'error') {
        this.generarSwal(val.mensaje);
      } else {
        this.guardarSessionStorage(val);
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

  guardarSessionStorage(data: any) {
    console.log(data.data.tipo);
    if (data.data.tipo == 0) {
      this.tokenService.saveToken(data.accessToken);
      this.tokenService.saveUser(data.data);
      this.router.navigate(['dashboard']);
    } else {
      this.tokenService.saveToken(data.accessToken);
      this.tokenService.saveUser(data.data);
      this.router.navigate(['dashboardprofesor']);
    }
  }
}
