import { Component, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, Refresher, AlertController } from 'ionic-angular';

import { CreatePostPage } from '../create-post/create-post';
import {LoginPage} from '../login/login';
import {SearchPage} from '../search/search';
import {OrgApprovalPage} from '../org-approval/org-approval';

//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; //apparently AngularFire has been outdated
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import LocationProvider from '../../providers/location/location';


/**
 * Generated class for the FeedPage page.
 * Created by Ryan Roe for Beacon Capstone Project
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;

	public postList:Array<any>; //Is for creating a database reference so we can pull the data from Firebase.
	public loadedPostList:Array<any>; //So we dont have to call data twice from firebase
	public postRef;//:firebase.database.Reference;//Is to store the list of posts we’re pulling from Firebase.
	//public loading:Loading;
	public postsToLoad: number = 10;
	public isOrganization = false;
	public isAdmin = false;
	public isTest = true;
	public isUser = true;
	public isApprovedOrg = false;

	//added for image feature
	public ppURL: any; 



	//public profilePicURL = "https://firebasestorage.googleapis.com/v0/b/ionicdbtest1.appspot.com/o/profilePics%2FJzqwgbzupBaAz3lDNeJTa38jUXj2.jpg?alt=media&token=7934fabc-d63f-4d84-9e78-e2bc7de06408"



	constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, 
		public authProvider: AuthProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController) { 

		this.menuCtrl.enable(true, 'navMenu');

		var UID = firebase.auth().currentUser.uid;
    	var currentUserDB = firebase.database().ref('/userProfile/'+ UID);
    	currentUserDB.once('value', userInfo => {
        	var organization = userInfo.val().organization;
        	var approvedOrg = userInfo.val().approved;
        	var admin = userInfo.val().username;
        	if(organization != null )
	    	{
	       		this.isOrganization = true;
	       		this.isUser = false;
	    	}
	    	if(approvedOrg == "approved"){
	    		this.isApprovedOrg = true;
	    		this.isOrganization = false;
	    	}
	    	if(admin == "Ryan Roe")
	    	{
	       		this.isAdmin = true;
	    	}
	    });

	  	//this.itemsRef = fdb.list('/messages');
	    //this.items = this.itemsRef.valueChanges(); //valueChanges returns an observable which is necessary for async
	    this.postRef = firebase.database().ref('/messages').orderByChild('timestamp'); //creating a database reference

	    this.postRef.limitToFirst(this.postsToLoad).once('value', postList => {
          let posts = [];
          postList.forEach( post => {
            posts.push(post.val());
            return false;
          });
          this.postList = posts;
          this.loadedPostList = posts;
        });
  	}


  	ionViewDidLoad() {
  	 	console.log('ionViewDidLoad FeedPage');
  		 this.doRefresh(null);
   	     //Search Constructor: pulls data from Firebase into postList array everytime the data changes	 
   	     this.menuCtrl.enable(true, 'navMenu');
  	}

	btnCreateClicked(){
		this.navCtrl.push(CreatePostPage);
	}

	btnSearchClicked(){
		this.navCtrl.push(SearchPage);
	}
	

	btnOrgClicked(){
		this.navCtrl.push(OrgApprovalPage);
	}

	btnCreateClickedFalse(){
		if(this.isOrganization == true){
		  let alert = this.alertCtrl.create({
		    title: 'Sorry!',
		    subTitle: 'Only approved organization profiles are able to create posts with Beacon. Please wait until we approve your account.',
		    buttons: ['Dismiss']
		  });
		  alert.present();
		}
		else {
		  let alert = this.alertCtrl.create({
		    title: 'Sorry!',
		    subTitle: 'User profiles are unable to create posts. This is designed to declutter the feed, and enable you to quickly find supplies and volunteer opportunities.',
		    buttons: ['Dismiss']
		  });
		  alert.present();
		}
	};

	doRefresh(refresher) {
	    console.log('Begin async operation');
	   	this.postRef.limitToFirst(this.postsToLoad).once('value', postList => { //value event is used to read a static snapshot of the contents at a given database path, as they existed at the time of the read event. It is triggered once with the initial data and again every time the data changes.
		 	let posts = [];  //store Firebase data temporarily
		  	postList.forEach( item => { 
		    	posts.push(item.val()); //returns the value attribute of item
	   	 		return false;

	 		});
	 		this.postList = posts;
	 		this.loadedPostList = posts;
	 		if(refresher != null)
	 		{
	 			refresher.complete();
	 		}
		});
	}

	loadMorePosts(scroll) {
        this.postsToLoad += 10; // or however many more you want to load
        this.postRef.limitToFirst(this.postsToLoad).once('value', postList => {
          let posts = [];
          postList.forEach( post => {
            posts.push(post.val());
            return false;
          });

          this.postList = posts;
          this.loadedPostList = posts;
          if(scroll != null)
          {
          	scroll.complete();
          }  
        });
    }


    //all code below added by Amanda for image features
    //to get user's profile picture on feed posts


  	getProfilePic(){
   		var UID = firebase.auth().currentUser.uid;
    	try{
    		const url = firebase.storage().ref().child('/profilePics/' + UID +'.jpg').getDownloadURL().then(function(url){
        		//url.toString();
        		this.ppURL = url;
      		});
    	}	
    	catch(e){
      		console.log(e);
   		}	   
  	}
/**
	getProfilePic(){
		this.ppURL = "https://firebasestorage.googleapis.com/v0/b/ionicdbtest1.appspot.com/o/profilePics%2FJzqwgbzupBaAz3lDNeJTa38jUXj2.jpg?alt=media&token=7934fabc-d63f-4d84-9e78-e2bc7de06408"
	}
*/
}

