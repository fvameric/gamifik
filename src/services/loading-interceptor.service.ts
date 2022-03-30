import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpResponse } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  cantidadPeticiones:number = 0;
  isLoading: boolean = false;

  constructor(public loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercept");
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
