import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {OrgProfilePage} from '../org-profile/org-profile';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginPage = LoginPage
  orgProfile = OrgProfilePage
  constructor(public navCtrl: NavController) {

  }

}
