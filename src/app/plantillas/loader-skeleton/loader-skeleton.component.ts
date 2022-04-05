import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'services/loader.service';

@Component({
  selector: 'app-loader-skeleton',
  templateUrl: './loader-skeleton.component.html',
  styleUrls: ['./loader-skeleton.component.css'],
})
export class LoaderSkeletonComponent implements OnInit {
  @Input() Cwidth: any;
  @Input() Cheight: any;
  @Input() circle: boolean=false;

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {}

  getMyStyles() {
    const myStyles = {
      'width.px': this.Cwidth ? this.Cwidth : '',
      'height.px': this.Cheight ? this.Cheight : '',
      'border-radius': this.circle ? '50%' : '',
    };
    return myStyles;
  }
}
