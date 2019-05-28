import { HomepageComponent } from './homepage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', component: HomepageComponent },
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
   ],
  declarations: [HomepageComponent]
})
export class HomepageModule { }
