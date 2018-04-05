import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; //apparently AngularFire has been outdated
import { AngularFireAuth } from 'angularfire2/auth';

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

  public UID; 
  public currentUserDB;
  public organization;
  public username;
  public email;
  public phone;
  public address;

  public organizationForm;
  public userForm;
  public passwordForm;

  constructor(private fdb: AngularFireDatabase, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams,  public formBuilder: FormBuilder) {
  	this.menuCtrl.enable(true, 'navMenu');
    //goes directly to the entry for the user based off of the USER ID. 
    this.UID = firebase.auth().currentUser.uid
    this.currentUserDB = firebase.database().ref('/userProfile/'+ this.UID);

    this.currentUserDB.once('value', userInfo => {
        this.username = (userInfo.val().username);
        this.email = userInfo.val().email;
        this.phone = userInfo.val().phone;
        this.organization = userInfo.val().organization;
        this.address = userInfo.val().address;

     });

    this.organizationForm = formBuilder.group({
      organization: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      phone: ['', Validators.compose([Validators.minLength(9), Validators.required])],
      address: ['', Validators.required]
    });

    this.userForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      phone: ['', Validators.compose([Validators.minLength(9), Validators.required])]
    });

    this.passwordForm = formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password1: ['', Validators.compose([Validators.minLength(6), Validators.required, PasswordValidator.passwordsMatch])]
    });

    // this.organizationForm.get('organization').valueChanges.subscribe(value => {
    //   console.log('name has changed:', value);
    //});
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  isOrganization()
  {
    if(this.organization != null)
    {
       return true;
    }
    else
    {
      return false;
    }
  }

  updateUser()
  {
    this.currentUserDB.update({ username: this.username,
     email: this.email, 
     phone: this.phone});
    firebase.auth().currentUser.updateEmail(this.email);
    // An error happened.
  }

  updateOrganization()
  {
    this.currentUserDB.update({ username: this.username, 
      email: this.email, 
      phone: this.phone, 
      address: this.address,
      organization: this.organization});
    firebase.auth().currentUser.updateEmail(this.email);
  }

  updatePassword()
  {

    if(firebase.auth().currentUser
      .reauthenticateWithCredential(firebase.auth.EmailAuthProvider
      .credential(firebase.auth().currentUser.email,this.passwordForm.value.currentPassword)))
    {
        firebase.auth().currentUser.updatePassword(this.passwordForm.value.password2).then(function() {
          console.log("password updated successfully");
        }).catch(error => {
          console.log(error);
        });

    }
  }


}
