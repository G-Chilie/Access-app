import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetBasisPasswordComponent } from './reset-basis-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuickLinksModule } from '../quick-links/quick-links.module';
import { MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, MatFormFieldModule
  ],
  declarations: [ResetBasisPasswordComponent],
  exports: [ ResetBasisPasswordComponent ]
})
export class ResetBasisPasswordModule { }
