import { HomepageComponent } from './homepage/homepage.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
      path: '',
      component: DashboardComponent,
      children: [
                  { path: '', component: HomepageComponent },
                  { path: 'home', component: HomepageComponent}
                ]
  },
  ];

export const DashboardRoutes = RouterModule.forChild(routes);
