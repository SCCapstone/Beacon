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
import { NativeGeocoder, /*NativeGeocoderReverseResult,*/ NativeGeocoderForwardResult} from '@ionic-native/native-geocoder';
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
  public addr;
  public addr2;

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
  
  public postImgURL = null;
  public ppURL;

  constructor(public events: Events, public menuCtrl: MenuController, public navCtrl: NavController, private geolocation: Geolocation,  public navParams: NavParams, 
   public fdb: AngularFireDatabase,afAuth: AngularFireAuth, public alertCtrl: AlertController,
   public camera: Camera, public loadingCtrl: LoadingController, public nativeGeocoder: NativeGeocoder) {
  
    this.UID = firebase.auth().currentUser.uid
    this.currentUserDB = firebase.database().ref('/userProfile/'+ this.UID);
    this.itemsRef = fdb.list('messages');
    this.check = 0;

    this.currentUserDB.once('value', userInfo => {
        this.username = (userInfo.val().username);
        this.email = userInfo.val().email;
        this.phone = userInfo.val().phone;
        this.organization = userInfo.val().organization;
        this.addr2 = userInfo.val().address;
    });
  }


//pull profile pick in when page is fully loaded
  ionViewDidEnter(){
    var filename = firebase.auth().currentUser.email;
    firebase.storage().ref().child('/profilePics/' + filename +'.jpg').getDownloadURL().then((url)=>{
      this.ppURL = url;
    },
    (err) => { 
      this.ppURL = "assets/imgs/blank-profile-picture.jpg";
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

  //converts address to latitude and longitude
  getLatLong(addr){
    this.nativeGeocoder.forwardGeocode(addr).then((coords: NativeGeocoderForwardResult) => {
      console.log('nativeGeocoder:' + coords);
      this.latitude = parseFloat(coords.latitude);
      this.longitude = parseFloat(coords.longitude);
    }).catch((err)=> {
      console.log(err);
    })
  }


  //used to give nativeGeocoder time to work
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  //pushes the post to the database
  chatSend(theirTitle: string, theirMessage: string, address: string, city: string, state: string) {
    console.log(this.organization);
    this.latitude = 0;
    this.longitude = 0;
    this.addr = address + ", " + city + ", " + state;
    //this.getLatLong(this.addr);
    //this.sleep(1000);
    //if lat and long can't be gotten from address...
    this.nativeGeocoder.forwardGeocode(this.addr).then((coords: NativeGeocoderForwardResult) => {
      console.log('nativeGeocoder:' + coords);
      this.latitude = parseFloat(coords.latitude);
      this.longitude = parseFloat(coords.longitude);
      const item = {
        message: theirMessage, //works
        title: theirTitle,     //works
        timestamp: Date.now() * -1, //works, but needs filtering
        PostType: this.typeofPost,  //works
        email: this.email, 
        organization: this.organization,  
        ppURL: this.ppURL,  //profile picture url
        postImgURL: this.postImgURL, //post image url 
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude),
        postPhone: this.phone,
        address: this.addr
      }
      this.itemsRef.push(item);
      //event to notify feed to refresh

    }).catch((err)=> {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Unable to Post. Could not find the address.',
        buttons: ['Dismiss']
      });
      alert.present();
    })
    this.events.publish('user_posted', item);

    this.navCtrl.setRoot(FeedPage); 
    /*if(this.latitude == 0 && this.longitude == 0){
      const item = {
        message: theirMessage, //works
        title: theirTitle,     //works
        timestamp: Date.now() * -1, //works, but needs filtering
        PostType: this.typeofPost,  //works
        email: this.email, 
        organization: this.organization,  
        ppURL: this.ppURL,  //profile picture url
        postImgURL: this.postImgURL, //post image url 
        postPhone: this.phone,
        address: this.addr
      }
    }
    //if lat and long can be gotten from address
    else{
      const item = {
        message: theirMessage, //works
        title: theirTitle,     //works
        timestamp: Date.now() * -1, //works, but needs filtering
        PostType: this.typeofPost,  //works
        email: this.email, 
        organization: this.organization,  
        ppURL: this.ppURL,  //profile picture url
        postImgURL: this.postImgURL, //post image url 
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude),
        postPhone: this.phone,
        address: this.addr
      }
    }
    this.itemsRef.push(item);
    //event to notify feed to refresh
    this.events.publish('user_posted', item);

    this.navCtrl.setRoot(FeedPage); */
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
      this.postImgURL = 'data:image/jpeg;base64,' + imageData;
      let storageRef = firebase.storage().ref();
      const filename = Date.now() * -1; //naming the file to match the current time stamp so it can match post
      const imageRef = storageRef.child('images/' + filename + '.jpg'); //places picture ref in folder of profile pics with UID as name of file
      imageRef.putString(this.postImgURL, firebase.storage.StringFormat.DATA_URL);
    },
    (err) => {
      //user feed back
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'There was a problem uplaoding you picture. Please try again.',
        buttons: ['Dismiss']
      });
      alert.present();
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
      //user feed back
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'There was a problem uplaoding you picture. Please try again.',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

}
