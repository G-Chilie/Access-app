import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{
  path: '',
  component: AuthComponent,
  children: [
    { path: '', component: AuthComponent },
    { path: 'login', component: AuthComponent },
  ]
}
];

export const AuthRoutes = RouterModule.forChild(routes);
