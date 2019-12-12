import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenValidationRoutingModule } from './token-validation-routing.module';
import { TokenValidationComponent } from './container/token-validation/token-validation.component';

@NgModule({
  imports: [
    CommonModule,
    TokenValidationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TokenValidationComponent]
})
export class TokenValidationModule { }
