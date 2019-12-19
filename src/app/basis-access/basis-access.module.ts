import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BasisAccessRoutingModule } from './basis-access-routing.module';
import { BasisAccessComponent } from './container/basis-access/basis-access.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [BasisAccessComponent],
  exports: [ BasisAccessComponent ]
})
export class BasisAccessModule { }
