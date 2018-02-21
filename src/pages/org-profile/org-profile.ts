import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LocationProvider} from '../../providers/location/location';

/**
 * Generated class for the OrgProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-org-profile',
  templateUrl: 'org-profile.html',
})
export class OrgProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private locationProvider : LocationProvider) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrgProfilePage');
    
  }

  
  
 

}
