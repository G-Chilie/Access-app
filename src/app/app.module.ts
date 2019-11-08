import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UiModule } from './shared/ui/ui.module';
import { AppRouteRoutes } from './app-route.routing';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { OpenurlComponent } from './openurl/openurl.component';
import { ResetBasisPasswordComponent } from './reset-basis-password/reset-basis-password.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
// import { NotificationsService } from '../../node_modules/@angular/common/http/src/angular2-notifications';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, OpenurlComponent, ResetBasisPasswordComponent, NotificationModalComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule,
    HttpClientModule, UiModule, NgbModule, AppRouteRoutes, RouterModule.forRoot([])
  ],
  exports: [RouterModule],
  providers: [LoginComponent, ResetBasisPasswordComponent, NotificationModalComponent, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
