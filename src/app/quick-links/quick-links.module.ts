import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinksComponent } from './quicklinks.component';
import { ResetBasisPasswordComponent } from '../reset-basis-password/reset-basis-password.component';
import { KillMyIDStatus } from '../_model/user';
import { HomepageModule } from '../dashboard/homepage/homepage.module';
import { ResetBasisPasswordModule } from '../reset-basis-password/reset-basis-password.module';

@NgModule({
  declarations: [QuicklinksComponent],
  imports: [
    CommonModule,
    // HomepageModule,
    ResetBasisPasswordModule
  ],
  exports: [ QuicklinksComponent ]
})
export class QuickLinksModule { }
