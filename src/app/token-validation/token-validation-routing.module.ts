import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TokenValidationComponent } from './container/token-validation/token-validation.component';
import {Component, Inject} from '@angular/core';


const routes: Routes = [
  {
    path: 'token-validation',
    component: TokenValidationComponent,
    data: {
      title: 'token-validation'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokenValidationRoutingModule { }
