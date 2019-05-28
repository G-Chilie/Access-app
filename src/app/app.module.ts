import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UiModule } from './shared/ui/ui.module';
import { AppRouteRoutes } from './app-route.routing';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { OpenurlComponent } from './openurl/openurl.component';
// import { NotificationsService } from '../../node_modules/@angular/common/http/src/angular2-notifications';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, OpenurlComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule,
    HttpClientModule, UiModule, NgbModule, AppRouteRoutes, RouterModule.forRoot([])
  ],
  exports: [RouterModule],
  providers: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
