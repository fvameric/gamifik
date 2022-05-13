import { Injectable } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const URL_REFRESCAR_TOKEN =  'http://localhost:8080/tokenJWT/refrescarToken.php';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  num: number = 0;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {
  }

  signOut(): void {
    localStorage.clear();
    window.location.reload();
  }

  saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }
  
  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }
  
  saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY) || '');
  }

  tokenExpired() {
    const token = this.getToken();
    if (token != '') {
      console.log("expired: " + this.jwtHelper.isTokenExpired(token));
      if (this.jwtHelper.isTokenExpired(token)) {
        this.signOut();
      }
    }
  }
  
  generarToken() {
    this.http.get(URL_REFRESCAR_TOKEN);
  }

}
