import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrgApprovalPage } from './org-approval';

@NgModule({
  declarations: [
    OrgApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrgApprovalPage),
  ],
})
export class OrgApprovalPageModule {}
