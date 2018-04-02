import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import { FeedPage } from '../feed/feed';

import { storage } from 'firebase'; //added 3/31 by amanda
import { Camera , CameraOptions} from '@ionic-native/Camera'; //added 3/31 by Amanda
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})
export class UserSignupPage {
  public signupForm:FormGroup;
  public loading:Loading;
  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public loadingCtrl: LoadingController, 
  public alertCtrl: AlertController, public formBuilder: FormBuilder, 
  public authProvider: AuthProvider, public camera: Camera, private transfer: FileTransfer, private file: File) {
    this.menuCtrl.enable(false, 'navMenu');

    this.signupForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password2: ['', Validators.compose([Validators.minLength(6), Validators.required, PasswordValidator.passwordsMatch])],
      phone: ['', Validators.compose([Validators.minLength(9), Validators.required])],
      
    });
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.phone)
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
        mediaType: this.camera.MediaType.PICTURE,
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
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL, //gives image back as base 64 image
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((imageData) => { 
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    },
    (err) => {
      // Handle error
    });
  }


}
