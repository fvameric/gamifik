import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/interfaces/User';

const URL_LOGIN = 'http://localhost:8080/identificacion/loginUser.php';
const URL_REGISTRO = 'http://localhost:8080/identificacion/loginUser.php';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(URL_LOGIN, JSON.stringify(user));
  }

  registroUser(user: User): Observable<User> {
    return this.http.post<User>(URL_REGISTRO, JSON.stringify(user));
  }
}
