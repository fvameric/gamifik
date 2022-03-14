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
    window.sessionStorage.clear();
    window.location.reload();
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  
  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }
  
  saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '');
  }

  tokenExpired(token: string) {
    console.log("expired: " + this.jwtHelper.isTokenExpired(token));
    
    if (this.jwtHelper.isTokenExpired(token)) {
      this.signOut();
    }
  }
  
  generarToken() {
    this.http.get(URL_REFRESCAR_TOKEN);
  }
}
