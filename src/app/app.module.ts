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
import { HomepageComponent } from './dashboard/homepage/homepage.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './_guards/auth.guard';
import { TokenValidationModule } from './token-validation/token-validation.module';
import { TokenValidationComponent } from './token-validation/container/token-validation/token-validation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpModalComponent } from './modal/pop-up-modal/pop-up-modal.component';

// import { NotificationsService } from '../../node_modules/@angular/common/http/src/angular2-notifications';

@NgModule({
  declarations: [
    AppComponent, NotificationModalComponent, RouteToApplicationComponent, PopUpModalComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule,
    HttpClientModule, UiModule, NgbModule, AppRouteRoutes, RouterModule.forRoot([]), TokenValidationModule, BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard, PopUpModalComponent,
    ResetBasisPasswordComponent, KillMyIdComponent,
    QuicklinksComponent, TokenValidationComponent, NotificationModalComponent, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
