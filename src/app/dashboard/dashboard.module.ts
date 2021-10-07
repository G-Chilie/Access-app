import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UiModule } from '../shared/ui/ui.module';
import { DashboardRoutes } from './dashboard.routing';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardService } from './_services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { BasisBranchesComponent } from './basis-branches/basis-branches.component';

@NgModule({
  declarations: [DashboardComponent, BasisBranchesComponent],
  imports: [
    CommonModule, UiModule, DashboardRoutes, UiModule, HttpClientModule
  ],
  exports: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule { }
