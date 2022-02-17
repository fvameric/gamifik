import { Injectable } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private jwtHelper: JwtHelperService) { }

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
      //this.signOut();
    }
  }
}
