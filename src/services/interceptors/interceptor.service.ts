import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/token.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  // intercepta todas las peticiones http
  // si el token no es nulo, se le pasa el token en el header a cada request
  // para indicar que el user ha iniciado sesión y que puede utilizar esa request
  // ya sea consultar, crear, modificar o eliminar en caso de que pueda
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}