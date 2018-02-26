import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupChoicePage');
  }

  goToPersonalSignupPage()
  {
  	this.navCtrl.push('SignupPage');
  }

  goToOrganizationSignupPage()
  {
  	this.navCtrl.push('OrgProfilePage');
  }

}
