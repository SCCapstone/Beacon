import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrgSignupPage } from './org-signup';

@NgModule({
  declarations: [
    OrgSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(OrgSignupPage),
  ],
})
export class OrgSignupPageModule {}
