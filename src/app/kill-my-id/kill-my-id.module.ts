import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KillMyIdComponent } from '../kill-my-id/kill-my-id.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [KillMyIdComponent],
  exports: [ KillMyIdComponent ]
})
export class KillMyIdModule { }
