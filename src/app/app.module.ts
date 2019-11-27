import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
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
import { QuicklinksComponent } from './quick-links/quicklinks.component';
import { QuickLinksModule } from './quick-links/quick-links.module';
import { HomepageModule } from './dashboard/homepage/homepage.module';
import { ResetBasisPasswordModule } from './reset-basis-password/reset-basis-password.module';
import { KillMyIdComponent } from './kill-my-id/kill-my-id.component';
import { RouteToApplicationComponent } from './route-to-application/route-to-application.component';
import { LoginModule } from './auth/login/login.module';

// import { NotificationsService } from '../../node_modules/@angular/common/http/src/angular2-notifications';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, NotificationModalComponent, RouteToApplicationComponent
  ],
  imports: [
    BrowserModule, LoginModule, ReactiveFormsModule, FormsModule, HomepageModule,
    HttpClientModule, UiModule, NgbModule, AppRouteRoutes, RouterModule.forRoot([])
  ],
  exports: [RouterModule],
  providers: [
    LoginComponent, ResetBasisPasswordComponent, KillMyIdComponent,
    QuicklinksComponent,  NotificationModalComponent, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
