import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomepageComponent } from './dashboard/homepage/homepage.component';

const appName = localStorage.getItem('ClickedApp');
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', //   canActivate: [AuthGuard],
      children: [
        { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule'},
     //  ,
      ]
   },
   // { path: '**', pathMatch: 'full', redirectTo: 'login' },
{
  path: 'BPS_Emeka',
        component: HomepageComponent,
        resolve: {
            url: 'externalUrlRedirectResolver'

        },
        data: {
            // externalUrl: localStorage.getItem('ClickedUrl')
            externalUrl: 'http://gtweb.gtbank.com/Adeolu/JennyBPS/ssologin.aspx',
            uid: 'gz/GyfW600Wb9NORPs21rA==',
            upass: '+dkMQlodWQJFn5Uau8OzIg==',
            ucode: '2232343434'
        }

}
];

export const AppRouteRoutes = RouterModule.forChild(routes);
