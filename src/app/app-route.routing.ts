import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomepageComponent } from './dashboard/homepage/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', //   canActivate: [AuthGuard],
      children: [
        { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule'},
     //  ,
      ]
   },
   // { path: '**', pathMatch: 'full', redirectTo: 'login' }
{
  path: 'test',
        component: HomepageComponent,
        resolve: {
            url: 'externalUrlRedirectResolver'
        },
        data: {
            externalUrl: 'http://www.google.com'
        }
}
];

export const AppRouteRoutes = RouterModule.forChild(routes);
