import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/interfaces/User';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const URL_LOGIN = 'http://localhost:8080/identificacion/loginUser.php';
const URL_REGISTRO = 'http://localhost:8080/identificacion/loginUser.php';
const USER_LS = 'userLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: User) {
    return this.http.post(URL_LOGIN, JSON.stringify(user)).subscribe((val: any) => {
      console.log(val);

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

  registroUser(user: User): Observable<User> {
    return this.http.post<User>(URL_REGISTRO, JSON.stringify(user));
  }
}
