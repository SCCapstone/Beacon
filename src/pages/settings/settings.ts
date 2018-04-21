import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; //apparently AngularFire has been outdated
import { AngularFireAuth } from 'angularfire2/auth';

import { storage } from 'firebase'; //added 3/31 by amanda
import { Camera , CameraOptions} from '@ionic-native/camera'; //added 3/31 by Amanda
import { normalizeURL } from 'ionic-angular';

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

  public capturedDataURL; //user's newly uploaded (taken or selected image)
  public ppURL;

  constructor(public toastCtrl: ToastController, private fdb: AngularFireDatabase, public menuCtrl: MenuController,
   public navCtrl: NavController, public navParams: NavParams,  public formBuilder: FormBuilder, public camera: Camera) {
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

  //pull profile pick in when page is fully loaded
  ionViewDidLoad(){
    var filename = this.email;
    firebase.storage().ref().child('/profilePics/' + filename + '.jpg').getDownloadURL().then((url)=>{
      this.ppURL = url;
    }, 
      (err) => { 
        this.ppURL = "https://firebasestorage.googleapis.com/v0/b/beacon-7a98f.appspot.com/o/profilePics%2Fblank-profile-picture.jpg?alt=media&token=831ee3b5-7941-4aa0-a07d-8b736967fa85";
    });
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
    var that = this;
    var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, that.passwordForm.value.currentPassword);
    firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function() {
      firebase.auth().currentUser.updatePassword(that.passwordForm.value.password1).then(function() {
        console.log("password updated successfully");
        let toast = this.toastCtrl.create({
          message: 'Password Updated Successfully',
          duration: 1000,
          position: 'middle'
        });
        toast.present();
      }).catch(error => {
        let toast = this.toastCtrl.create({
          message: 'Unable to update password',
          duration: 1000,
          position: 'middle'
        });
        toast.present();
      })
    }).catch(error => {
      let toast = this.toastCtrl.create({
        message: 'Invalid password',
        duration: 1000,
        position: 'middle'
      });
      toast.present();
    });
    this.passwordForm.reset();
  }


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
      //this.ppURL = 'data:image/jpeg;base64,' + imageData;
    },
    (err) => {
      // Handle error
    });
    //uploading the picture
    let storageRef = firebase.storage().ref();
    const filename = this.email; //naming the file to match the current user's email
    const imageRef = storageRef.child('profilePics/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
    imageRef.putString(this.capturedDataURL, firebase.storage.StringFormat.DATA_URL);
    this.ppURL = this.capturedDataURL;//updates photo url to new photo url
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
      //this.ppURL = 'data:image/jpeg;base64,' + imageData;
    },
    (err) => {
      // Handle error
    });
    //uploading the picture
    let storageRef = firebase.storage().ref();
    const filename = String(this.email); //naming the file to match the current user's email
    const imageRef = storageRef.child('profilePics/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
    imageRef.putString(this.capturedDataURL, firebase.storage.StringFormat.DATA_URL);
    this.ppURL = this.capturedDataURL;//updates photo url to new photo url
  }

/**
  public uploadPic(){ //uploads image to firebase storage
    let storageRef = firebase.storage().ref();
    const filename = this.email; //naming the file to match the current user's email
    const imageRef = storageRef.child('profilePics/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
    imageRef.putString(this.capturedDataURL, firebase.storage.StringFormat.DATA_URL);
    this.ppURL = this.capturedDataURL;//updates photo url to new photo url
  }
*/


}
