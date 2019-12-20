import { HomepageComponent } from './homepage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinksComponent } from 'src/app/quick-links/quicklinks.component';
import { QuickLinksModule } from 'src/app/quick-links/quick-links.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import {MatDialogModule} from '@angular/material';
import { PopUpModalComponent } from 'src/app/modal/pop-up-modal/pop-up-modal.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
];
@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    QuickLinksModule,
    UiModule,
    MatDialogModule
   ],
   entryComponents: [ PopUpModalComponent ]
})
export class HomepageModule { }
