import { Component } from '@angular/core';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController,
  MenuController
   } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
//import {AngularFireDatabase} from 'angularfire2/database';
import { FeedPage } from '../feed/feed';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  public loginForm:FormGroup;


  public loading:Loading;


  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public formBuilder: FormBuilder,
    public authProvider: AuthProvider, public facebook: Facebook) {

    this.menuCtrl.enable(false, 'navMenu');
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

facebookLogin(){

    this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);  
      this.authProvider.facebookLogin(facebookCredential).then( authData => {
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot(FeedPage);
          });
        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: "Error loading facebook login",
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

        this.loading = this.loadingCtrl.create();
        this.loading.present();
      });
  }
  
  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(FeedPage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  goToSignup(){
    this.navCtrl.push('SignupChoicePage');

  }

  goToResetPassword(){
    this.navCtrl.push('PasswordResetPage');
  }


}
