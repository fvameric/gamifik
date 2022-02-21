import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  constructor() { }

  show() {
    this.isLoading.next(true);
    console.log("loader servie show");
  }
  hide() {
    this.isLoading.next(false);
    console.log("loader servie hide");
  }
}
