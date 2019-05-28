import { HomepageComponent } from './homepage/homepage.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
      path: '',
      component: DashboardComponent,
      children: [
                  { path: '', pathMatch: 'full', redirectTo: 'home' },
                  {path: 'home', loadChildren: './homepage/homepage.module#HomepageModule'}
                ]
  },
  ];

export const DashboardRoutes = RouterModule.forChild(routes);
