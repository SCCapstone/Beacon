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

  /**
  public currentUser;
  public organization;
  name;
  email;
  public phone;
  public username;

  */
  
  //added
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
  //end added


  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase,afAuth: AngularFireAuth,
   public alertCtrl: AlertController, private locationProvider : LocationProvider) {
    
  	/*this.fdb.list("/posts/").valueChanges().subscribe(_data => {
		this.arrData = _data;

		console.log(this.arrData);
  })*/

  /**
    this.currentUser = firebase.auth().currentUser;
    if (this.currentUser != null) 
    { 
     this.name = this.currentUser.name; //logs null
     this.email = this.currentUser.email; 
     this.phone = this.currentUser.userPhone;//logs null
      console.log(this.currentUser.email);
      console.log(this.currentUser.name);
      console.log(this.currentUser.userPhone);
    }
*/
    //added
        this.UID = firebase.auth().currentUser.uid
    this.currentUserDB = firebase.database().ref('/userProfile/'+ this.UID);

    this.currentUserDB.once('value', userInfo => {
        this.username = (userInfo.val().username);
        this.email = userInfo.val().email;
        this.phone = userInfo.val().phone;
        this.organization = userInfo.val().organization;
        this.address = userInfo.val().address;

     });
     //end added


  	this.itemsRef = fdb.list('messages');
   // this.items = this.itemsRef.valueChanges();//There are properties, such as valueChanges, that return an RxJS Observable. 

    //this.locationprovidermessage = this.locationProvider.username;

}



//Sends the post information to database
 chatSend(theirTitle: string, theirMessage: string, theirLocation: string, theirImage: string, theirUser : string, userImageSrc: string) {
 	 console.log(this.organization);
   const item = {
    
 		message: theirMessage, //works
 		title: theirTitle,     //works
 		timestamp: Date.now() * -1, //works, but needs filtering
    PostType: this.typeofPost,  //works
    email: this.email, 
    organization: this.organization  
   // username: this.name
   // location: theirLocation,
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
