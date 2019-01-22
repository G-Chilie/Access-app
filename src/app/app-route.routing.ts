import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent},

  {
      path: '',
    //   canActivate: [AuthGuard],
      children: [
        { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
     //  ,
      ]
   },

    { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
];

export const AppRouteRoutes = RouterModule.forChild(routes);
