import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { PopUpModalRoutingModule } from './pop-up-modal-routing.module';
import { PopUpModalComponent } from '../pop-up-modal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
  } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,

    MatFormFieldModule, MatDialogModule, ReactiveFormsModule, FormsModule

  ],
  declarations: [PopUpModalComponent],
  exports: [ PopUpModalComponent ]
})
export class PopUpModalModule { }
