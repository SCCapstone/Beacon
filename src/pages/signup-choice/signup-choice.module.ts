import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupChoicePage } from './signup-choice';

@NgModule({
  declarations: [
    SignupChoicePage,
  ],
  imports: [
    IonicPageModule.forChild(SignupChoicePage),
  ]
})
export class SignupChoicePageModule {}
