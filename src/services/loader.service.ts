import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  isLoading = new Subject<boolean>();
  
  constructor() { }

  // subject es como un emisor
  // mientras le digamos en loading-interceptor, que siguen habiendo peticiones
  // entonces, sigue mostrando el loader
  show() {
    this.isLoading.next(true);
  }

  // cuando se terminen las peticiones
  // le indicamos al emisor que deje de mostrar el loader
  hide() {
    this.isLoading.next(false);
  }
}
