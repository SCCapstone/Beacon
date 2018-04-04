import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
//import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; //apparently AngularFire has been outdated
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
//import {firebase} from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FeedPage } from '../feed/feed';
import {LocationProvider} from '../../providers/location/location';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
/**
 * Generated class for the CreatePostPage page.
 * Created by Ryan Roe for Beacon Capstone Project
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

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


  constructor(public menuCtrl: MenuController, public navCtrl: NavController, private geolocation: Geolocation,  public navParams: NavParams, private fdb: AngularFireDatabase,afAuth: AngularFireAuth,
   public alertCtrl: AlertController, private locationProvider : LocationProvider) {
  
    this.UID = firebase.auth().currentUser.uid
    this.currentUserDB = firebase.database().ref('/userProfile/'+ this.UID);
    this.itemsRef = fdb.list('messages');

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

          console.log(pos);

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

 chatSend(theirTitle: string, theirMessage: string) {
 	 console.log(this.organization);
   const item = {
    
 		message: theirMessage, //works
 		title: theirTitle,     //works
 		timestamp: Date.now() * -1, //works, but needs filtering
    PostType: this.typeofPost,  //works
    email: this.email, 
    organization: this.organization,  
   // username: this.name
    latitude: this.currentPos.coords.latitude,
    longitude: this.currentPos.coords.longitude,
   // image: theirImage
   // userImage : userImageSrc
 	 }
    this.itemsRef.push(item);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePostPage');

  }

  showSelected(mySelect : string) {

    console.log(mySelect);
    this.typeofPost = mySelect;
  }

}
