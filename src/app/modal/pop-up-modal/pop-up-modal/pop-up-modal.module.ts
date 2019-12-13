import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule } from '@angular/material';
import { PopUpModalRoutingModule } from './pop-up-modal-routing.module';
import { PopUpModalComponent } from '../pop-up-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PopUpModalRoutingModule,
    MatFormFieldModule
  ],
  declarations: [PopUpModalComponent]
})
export class PopUpModalModule { }
