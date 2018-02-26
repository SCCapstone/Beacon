import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSignupPage } from './user-signup';

@NgModule({
  declarations: [
    UserSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSignupPage),
  ],
  exports: [
    UserSignupPage
  ]
})
export class UserSignupPageModule {}
