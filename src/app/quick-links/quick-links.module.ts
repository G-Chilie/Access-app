import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinksComponent } from './quicklinks.component';
import { ResetBasisPasswordComponent } from '../reset-basis-password/reset-basis-password.component';
import { KillMyIdModule } from '../kill-my-id/kill-my-id.module';
import { HomepageModule } from '../dashboard/homepage/homepage.module';
import { ResetBasisPasswordModule } from '../reset-basis-password/reset-basis-password.module';
import { KillMyIdComponent } from '../kill-my-id/kill-my-id.component';

@NgModule({
  declarations: [QuicklinksComponent],
  imports: [
    CommonModule,
    // HomepageModule,
    ResetBasisPasswordModule, KillMyIdModule
  ],
  exports: [ QuicklinksComponent ]
})
export class QuickLinksModule { }
