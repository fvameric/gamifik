import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSkeletonComponent } from '../loader-skeleton.component';



@NgModule({
  declarations: [LoaderSkeletonComponent],
  imports: [
    CommonModule
  ],
  exports: [LoaderSkeletonComponent]
})
export class SkeletonLoaderModule { }
