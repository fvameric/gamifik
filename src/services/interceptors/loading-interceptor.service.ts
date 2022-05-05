import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpResponse } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TokenService } from '../auth/token.service';
import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  cantidadPeticiones:number = 0;
  isLoading: boolean = false;

  constructor(public loaderService: LoaderService) { }

  // intercepta todas las peticiones
  // si hay peticiones, muestra el loader
  // al acabarse las peticiones, escondemos el loader
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
