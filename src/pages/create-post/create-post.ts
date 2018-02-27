import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
//import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; //apparently AngularFire has been outdated
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
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



  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase,afAuth: AngularFireAuth,
   public alertCtrl: AlertController, private locationProvider : LocationProvider) {
    
    this.menuCtrl.enable(false, 'navMenu');
  	this.fdb.list("/posts/").valueChanges().subscribe(_data => {
		this.arrData = _data;

		console.log(this.arrData);
  })

  	this.itemsRef = fdb.list('messages');
    this.items = this.itemsRef.valueChanges();//There are properties, such as valueChanges, that return an RxJS Observable. 

/****Attempting to access logged in user's email
 //this.userEmail = firebase.auth().currentUser;
 //this.userEmail = MyApp.user.email; */
 this.locationprovidermessage = this.locationProvider.username;

}

//Sends the post information to database
 chatSend(theirMessage: string, theirTitle: string, theirLocation: string, theirImage: string, theirUser : string, userImageSrc: string, 
  theirUserName: string) {
 	const item = {
 		message: theirMessage, //works
 		title: theirTitle,     //works
 		timestamp: Date.now() * -1, //works, but needs filtering
    PostType: this.typeofPost,  //works
   // user: theirUser,       
    //username: theirUserName,
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

/* created to view the logged in user's email...which is not working.
 doAlert() {
    let alert = this.alertCtrl.create({
        title: 'New Friend!',
        subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!' + this.userEmail,
        buttons: ['Ok']
      });

    alert.present();
 }*/

}
