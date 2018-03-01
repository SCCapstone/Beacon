import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import { FeedPage } from '../feed/feed';

/**
 * Generated class for the OrgSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-org-signup',
  templateUrl: 'org-signup.html',
})
export class OrgSignupPage {

  public signupForm:FormGroup;
  public loading:Loading;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public authProvider: AuthProvider, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
  	this.menuCtrl.enable(false, 'navMenu');

  	this.signupForm = formBuilder.group({
  	  organization: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      phone: ['', Validators.compose([Validators.minLength(9), Validators.required])],
      address: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password2: ['', Validators.compose([Validators.minLength(6), Validators.required, PasswordValidator.passwordsMatch])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrgSignupPage');
    
  }

  signupOrganization(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {

      this.authProvider.signupOrganization(this.signupForm.value.organization, 
      	this.signupForm.value.name, 
      	this.signupForm.value.email, 
      	this.signupForm.value.phone, 
      	this.signupForm.value.address, 
      	this.signupForm.value.password)
      .then(() => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(FeedPage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  returnToLogin()
  {
  	 this.navCtrl.popTo( this.navCtrl.getByIndex(0));
  }
}
