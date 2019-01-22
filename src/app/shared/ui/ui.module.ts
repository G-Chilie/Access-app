
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {HeaderComponent} from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule, NgbModule,  RouterModule
  ],
  declarations: [FooterComponent, HeaderComponent, LayoutComponent],
  exports: [LayoutComponent, HeaderComponent]
})
export class UiModule { }
