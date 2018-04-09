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
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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

  public myPhoto: any;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public authProvider: AuthProvider, 
    public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public camera: Camera, private transfer: FileTransfer, private file: File) {
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

  async takePhoto(){ //added 3/31
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL, //gives image back as base 64 image
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE, //only looks for pictures
        //sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true, //saving picture to library  
        correctOrientation: true 
    }
    this.camera.getPicture(options).then((imageData) => { 
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    },
    (err) => {
      // Handle error
    });
  }

  async getPhoto(){ //added 3/31
    try{

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL, //gives image back as base 64 image
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false
      }
    
      //code from paul halliday: store images with ionic
      const user = firebase.auth().currentUser; //getting current userID
      const result = await this.camera.getPicture(options);
      const image = 'data:image/jpeg;base64,${result}';
      const picRef = firebase.storage().ref( user + '/profilePic');
      picRef.putString(image, 'data_url'); 
    
       /**
      //code from paul halliday: store images with ionic
      //modifications
      //const user = firebase.auth().currentUser; //getting current userID
      const result = await this.camera.getPicture(options);
      const image = 'data:image/jpeg;base64,${result}';
      const profilePic = firebase.storage().ref( user + '/profilePic/');
      profilePic.putString(image, 'data_url'); 
      */
    }
    catch(e){
      console.error(e);
    }


    /**
    // code from ionic documentation and Maballo Net: pick from gallary
    this.camera.getPicture(options).then((imageData) => { 
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    },
    (err) => {
      // Handle error
    });
   */
  }
}


