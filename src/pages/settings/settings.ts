import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
  	this.menuCtrl.enable(true, 'navMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
