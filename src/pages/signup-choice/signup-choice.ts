import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UserSignupPage } from '../user-signup/user-signup';

/**
 * Generated class for the SignupChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-choice',
  templateUrl: 'signup-choice.html',
})
export class SignupChoicePage {

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false, 'navMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupChoicePage');
  }

  goToPersonalSignupPage()
  {
  	this.navCtrl.push('UserSignupPage');
  }

  goToOrganizationSignupPage()
  {
  	this.navCtrl.push('OrgSignupPage');
  }

}
