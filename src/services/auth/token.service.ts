import { Injectable } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

const URL_LOCALHOST = 'http://localhost:8080/';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
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

  tokenExpired(token: string) {
    console.log("expired: " + this.jwtHelper.isTokenExpired(token));
    
    if (this.jwtHelper.isTokenExpired(token)) {
      this.signOut();
    }
  }
  
  generarToken() {
    this.http.get(this.concatUrl('tokenJWT/refrescarToken.php'));
  }

  // concatena la URL de localhost y la string que le pasemos
  // ejemplo: "http://localhost:8080/string"
  concatUrl(urlStr: string) {
    return URL_LOCALHOST + urlStr;
  }

}
