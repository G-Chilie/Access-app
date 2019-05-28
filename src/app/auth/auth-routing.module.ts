import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
  path: '',

  data: {

    title: 'auth',

    status: false

  },
  children: [

    {

      path: '',

      redirectTo: 'login',

      pathMatch: 'full'

    },

    {

      path: 'login',

      loadChildren: './login/login.module#LoginModule'

    },
    {

      path: 'homepage',

      loadChildren: './dashboard/homepage.module#HomepageModule'

    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
