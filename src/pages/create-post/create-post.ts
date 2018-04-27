import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, LoadingController, Events } from 'ionic-angular';
//import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; //apparently AngularFire has been outdated
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
//import {firebase} from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FeedPage } from '../feed/feed';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

import { Camera , CameraOptions} from '@ionic-native/camera'; //added 3/31 by Amanda

/**
 * Generated class for the CreatePostPage page.
 * Created by Ryan Roe for Beacon Capstone Project
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {

postTitle
postContent
arrData = []
postData =[]
//options: GeolocationOptions;
//currentPos : Geoposition;
createPostMessage : any = "original messsage";
testingPostsArr : any = [];
locationprovidermessage;
typeofPost;
//msglat = LocationProvider.lat;
//msglon = LocationProvider.lon;
//second firebase messaging try variable
//items: any; //type of any, fetches chat items from fb project
 // name: any;
//  msgVal: string = '';

user: Observable<firebase.User>;

itemsRef: AngularFireList<any>;
items: Observable<any[]>;
userEmail: Observable<any>;

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
  options : GeolocationOptions;
  currentPos : Geoposition;
  public check: number;
  latitude;
  longitude;
  assignedlat;
  assignedlong;
  //setting postImgURL as a defualt blank image
  //public postImgURL = "https://firebasestorage.googleapis.com/v0/b/beacon-7a98f.appspot.com/o/images%2FBlank.jpg?alt=media&token=0d5f1c31-a1e2-45a1-91d3-fac8af207813"; //the image in the content of the post
  public postImgURL = null;
  public ppURL;

  constructor(public events: Events, public menuCtrl: MenuController, public navCtrl: NavController, private geolocation: Geolocation,  public navParams: NavParams, 
   public fdb: AngularFireDatabase,afAuth: AngularFireAuth, public alertCtrl: AlertController,
   public camera: Camera, public loadingCtrl: LoadingController) {
  
    this.UID = firebase.auth().currentUser.uid
    this.currentUserDB = firebase.database().ref('/userProfile/'+ this.UID);
    this.itemsRef = fdb.list('messages');
    this.check = 0;

    this.currentUserDB.once('value', userInfo => {
        this.username = (userInfo.val().username);
        this.email = userInfo.val().email;
        this.phone = userInfo.val().phone;
        this.organization = userInfo.val().organization;
        this.address = userInfo.val().address;

     });
    this.options = {
        enableHighAccuracy : false
      };
      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

          this.currentPos = pos;     
          this.latitude = pos.coords.latitude;
          this.longitude = pos.coords.longitude; 
          console.log(pos + "constructor function");
          console.log("constructor lat = " + this.latitude);
          console.log("constuctor long = " + this.longitude);
      },(err : PositionError)=>{
          console.log("error : " + err.message);
      ;
      })
    /*Mason I coded this function out because it was returning an error everytime the page loaded. "Uncaught (in promise): [object PositionError]" -Ryan  
     this.options = {
        enableHighAccuracy: false
       };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
      this.currentPos = pos;
      console.log(pos);
      //this.chatSend(theirTitle, theirMessage, pos.coords.latitude, pos.coords.longitude, theirImage, theirUser, userImageSrc);
    })*/

}


//pull profile pick in when page is fully loaded
ionViewWillEnter(){
  var filename = firebase.auth().currentUser.email;
  firebase.storage().ref().child('/profilePics/' + filename +'.jpg').getDownloadURL().then((url)=>{
    this.ppURL = url;
  },
  (err) => { 
    this.ppURL = "https://firebasestorage.googleapis.com/v0/b/beacon-7a98f.appspot.com/o/profilePics%2Fblank-profile-picture.jpg?alt=media&token=831ee3b5-7941-4aa0-a07d-8b736967fa85";
  });
}

  //added by Ryan to begin to fix the getUserPosition function. the user's position is asked for once in the feed, once in this constructor, and then everytime 
  assignUserPosition(){
    this.assignedlat = this.latitude;
    this.assignedlong = this.latitude 
    console.log("assigned long = " + this.assignedlong);      
    console.log("assigned lat = " + this.assignedlat);
  }


  getUserPosition(){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;    

        console.log(pos + "getUserPostion function");
        console.log(this.latitude);
        console.log(this.longitude);
    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
    this.check = 1; //Mason this will not work if the user checks the box and then unchecks the box. There is a way to tell whether the box is checked or not. onclick is not the proper function in the html - Ryan

  }

chatSend(theirTitle: string, theirMessage: string, latitude: Geoposition, longitude: Geoposition) {
 	 console.log(this.organization);
   if(this.check > 0){
   }
   else{
    this.latitude = latitude;
    this.longitude = longitude;
   }
   
   /**
   let storageRef = firebase.storage().ref();
   const filename = Date.now() * -1; //naming the file to match the current time stamp so it can match post
   const imageRef = storageRef.child('images/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
   imageRef.putString(this.postImgURL, firebase.storage.StringFormat.DATA_URL);
  */
   const item = {
 		message: theirMessage, //works
 		title: theirTitle,     //works
 		timestamp: Date.now() * -1, //works, but needs filtering
    PostType: this.typeofPost,  //works
    email: this.email, 
    organization: this.organization,  
    ppURL: this.ppURL,  //profile picture url
    postImgURL: this.postImgURL,   //post image url
    latitude: parseFloat(this.latitude),
    longitude: parseFloat(this.longitude),
    postPhone: this.phone
 	 }
   this.itemsRef.push(item);
   //event to notify feed to refresh
   this.events.publish('user_posted', item);

   this.navCtrl.setRoot(FeedPage); 
}

//functions for future adaptation
 updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
  /**
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePostPage');
  }
  */
  showSelected(mySelect : string) {
    console.log(mySelect);
    this.typeofPost = mySelect;
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
      //let data = normalizeURL(imageData);
      //this.postImgURL = data;
      this.postImgURL = 'data:image/jpeg;base64,' + imageData;
      let storageRef = firebase.storage().ref();
      const filename = Date.now() * -1; //naming the file to match the current time stamp so it can match post
      const imageRef = storageRef.child('images/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
      imageRef.putString(this.postImgURL, firebase.storage.StringFormat.DATA_URL);
    },
    (err) => {
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
    // code from ionic documentation and Maballo Net: pick from gallary
    this.camera.getPicture(options).then((imageData) => { 
      this.postImgURL = 'data:image/jpeg;base64,' + imageData;
      let storageRef = firebase.storage().ref();
      const filename = Date.now() * -1; //naming the file to match the current time stamp so it can match post
      const imageRef = storageRef.child('images/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
      imageRef.putString(this.postImgURL, firebase.storage.StringFormat.DATA_URL);
    },
    (err) => {
    });
  }

/**
  public uploadPic(){ //uploads image to firebase storage
    let storageRef = firebase.storage().ref();
    const filename = Date.now() * -1; //naming the file to match the current time stamp so it can match post
    const imageRef = storageRef.child('images/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
    imageRef.putString(this.postImgURL, firebase.storage.StringFormat.DATA_URL);
  }
*/

/**
  //WORKING! Pulls url in storage and places it in ppURL variable, now working on placing function call somewhere to call when page loads
  public getProfilePic(){ 
    var filename = this.UID;
    firebase.storage().ref().child('/profilePics/' + filename +'.jpg').getDownloadURL().then((url)=>{
      this.ppURL = url;
    });
  }
*/

}
