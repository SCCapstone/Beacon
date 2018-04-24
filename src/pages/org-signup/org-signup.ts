import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import { FeedPage } from '../feed/feed';

import { storage, initializeApp } from 'firebase'; //added 3/31 by amanda
import { Camera , CameraOptions} from '@ionic-native/camera'; //added 3/31 by Amanda
import firebase from 'firebase';


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

  public capturedDataURL;
  public ppURL;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public authProvider: AuthProvider, 
    public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public camera: Camera) {
  	this.menuCtrl.enable(false, 'navMenu');

  	this.signupForm = formBuilder.group({
  	  organization: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      phone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
      address: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password2: ['', Validators.compose([Validators.minLength(6), Validators.required, PasswordValidator.passwordsMatch])]
    });

  }



  //pull profile pick in when page is fully loaded
  ionViewDidEnter(){
    this.ppURL = "https://firebasestorage.googleapis.com/v0/b/beacon-7a98f.appspot.com/o/profilePics%2Fblank-profile-picture.jpg?alt=media&token=831ee3b5-7941-4aa0-a07d-8b736967fa85";
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


/**  All code below added by Amanda for image features */
   async takePhoto(){ //takes image with camera
    const options: CameraOptions = {
        quality: 40,
        destinationType: this.camera.DestinationType.DATA_URL, //gives image back as base 64 image
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE, //only looks for pictures
        saveToPhotoAlbum: true, //saving picture to library  
        correctOrientation: true 
    }
    this.camera.getPicture(options).then((imageData) => { 
      this.capturedDataURL = 'data:image/jpeg;base64,' + imageData;
      //uploading the picture
      let storageRef = firebase.storage().ref();
      const filename = this.signupForm.value.email; //naming the file to match the current user's email
      const imageRef = storageRef.child('profilePics/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
      imageRef.putString(this.capturedDataURL, firebase.storage.StringFormat.DATA_URL);
      this.ppURL = this.capturedDataURL;//updates photo url to new photo url
    },
    (err) => {
      // Handle error
    });
   
  }


  async getPhoto(){ //pulls from library
    const options: CameraOptions = {
        quality: 40,
        destinationType: this.camera.DestinationType.DATA_URL, //gives image back as base 64 image
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
        correctOrientation: true 
    }
    
    // code modified from ionic documentation and Maballo Net: pick from gallary
    this.camera.getPicture(options).then((imageData) => { 
      this.capturedDataURL = 'data:image/jpeg;base64,' + imageData;
      //uploading the picture
      let storageRef = firebase.storage().ref();
      const filename = this.signupForm.value.email; //naming the file to match the current user's email
      const imageRef = storageRef.child('profilePics/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
      imageRef.putString(this.capturedDataURL, firebase.storage.StringFormat.DATA_URL);
      this.ppURL = this.capturedDataURL;//updates photo url to new photo url
    },
    (err) => {
      // Handle error
    });
   
  }



}


