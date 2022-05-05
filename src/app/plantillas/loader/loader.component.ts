import { Component, OnInit } from '@angular/core';
import { LoadingInterceptorService } from 'services/interceptors/loading-interceptor.service';
import { LoaderService } from 'services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
  }

}
