import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomepageComponent } from './dashboard/homepage/homepage.component';
import { NgModule } from '@angular/core';

const appName = localStorage.getItem('ClickedApp');
const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: './auth/login/login.module#LoginModule'},
  // { path: 'login', loadChildren: import('./auth/login/login.module').then(m => m.LoginModule)},
  // loadChildren: './auth/login/login.module#LoginModule'
  {path: 'home', loadChildren: './dashboard/homepage/homepage.module#HomepageModule'},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];


export const AppRouteRoutes = RouterModule.forChild(routes);
