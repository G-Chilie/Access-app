import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomepageComponent } from './dashboard/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { TokenValidationComponent } from './token-validation/container/token-validation/token-validation.component';

const appName = localStorage.getItem('ClickedApp');
const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: './auth/login/login.module#LoginModule'},
  // { path: 'login', loadChildren: import('./auth/login/login.module').then(m => m.LoginModule)},
  // loadChildren: './auth/login/login.module#LoginModule'
  {path: 'home', canActivate: [AuthGuard], loadChildren: './dashboard/homepage/homepage.module#HomepageModule'},
  // tslint:disable-next-line: max-line-length
  {path: 'token-validation', canActivate: [AuthGuard], component: TokenValidationComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];


export const AppRouteRoutes = RouterModule.forChild(routes);
