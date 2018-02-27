import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import firebase from 'firebase';

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

  public currentUser;
  public organization;
  public name;
  email;
  public phone;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
  	this.menuCtrl.enable(true, 'navMenu');
  	this.currentUser = firebase.auth().currentUser;
  	if (this.currentUser != null) 
  	{	
  	  this.name = this.currentUser.name;
  	  this.email = this.currentUser.email;
  	  this.phone = this.currentUser.phone;
  	  console.log(this.email);
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
