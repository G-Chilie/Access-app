import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinksComponent } from './quicklinks.component';
import { ResetBasisPasswordComponent } from '../reset-basis-password/reset-basis-password.component';
import { KillMyIdModule } from '../kill-my-id/kill-my-id.module';
import { HomepageModule } from '../dashboard/homepage/homepage.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetBasisPasswordModule } from '../reset-basis-password/reset-basis-password.module';
import { KillMyIdComponent } from '../kill-my-id/kill-my-id.component';
import { TokenValidationModule } from '../token-validation/token-validation.module';
import { PopUpModalModule } from '../modal/pop-up-modal/pop-up-modal/pop-up-modal.module';
import { BasisAccessModule } from '../basis-access/basis-access.module';

@NgModule({
  declarations: [QuicklinksComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // HomepageModule,
    ResetBasisPasswordModule, TokenValidationModule, KillMyIdModule, PopUpModalModule, BasisAccessModule
  ],
  exports: [ QuicklinksComponent ]
})
export class QuickLinksModule { }
