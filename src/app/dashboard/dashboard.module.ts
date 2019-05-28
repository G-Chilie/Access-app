import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UiModule } from '../shared/ui/ui.module';
import { DashboardRoutes } from './dashboard.routing';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardService } from './_services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, UiModule, DashboardRoutes, UiModule, HttpClientModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule { }
