import { Component, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';

import { CreatePostPage } from '../create-post/create-post';
import {LoginPage} from '../login/login';

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
public postRef:firebase.database.Reference;//Is to store the list of posts we’re pulling from Firebase.
//public loading:Loading;

constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, 
	public authProvider: AuthProvider, public loadingCtrl: LoadingController) { 

  	//this.itemsRef = fdb.list('/messages');
    //this.items = this.itemsRef.valueChanges(); //valueChanges returns an observable which is necessary for async

    //Open a reference to our Firebase Database under the /messages node
    this.postRef = firebase.database().ref('/messages'); //creating a database reference



   	//this.postList.filter //need to filter posts by default
  }

  	//Search Functions

	initializeItems(): void {
  		this.postList = this.loadedPostList; //This is so we don't have to call the data again from Firebase. We can just use the list we already have.
	}
	getItems(searchbar) {
		
  		// Reset items back to all of the items
 		 this.initializeItems();

		  // set q to the value of the searchbar
		  var q = searchbar.srcElement.value;

		  // if the value is an empty string don't filter the items
		  if (!q) {
		    return;
		  }

		  //var newArray = arr.filter(callback[, thisArg]) //callback keeps element if true is returned
		  //v is a name we are giving to our projected array from this.postList
		  this.postList = this.postList.filter((v) => {
		    if(v.title && q) {
		      if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) { //checks the string against the value of the title property
		        return true;
		      }
		      return false;
		    }
		  });
  	console.log(q, this.postList.length);
	}
	//End of Search Functions

	//Initial filtering function
	/*
	this.postList = this.postList.filter((closelist)=>
	{
		if(closeList.distancefromuser < 20 && closeList.distancefromuser >=0){
			return true;
		}
		return false;
	}*/

  	ionViewDidLoad() {
  	 console.log('ionViewDidLoad FeedPage');
  	  let loading = this.loadingCtrl.create();
   	 
   	     //Search Constructor: pulls data from Firebase into postList array everytime the data changes
   	   loading.present().then(() =>{
	   	this.postRef.on('value', postList => { //value event is used to read a static snapshot of the contents at a given database path, as they existed at the time of the read event. It is triggered once with the initial data and again every time the data changes.
		  let posts = [];  //store Firebase data temporarily
		  postList.forEach( item => { 
		    posts.push(item.val()); //returns the value attribute of item
	   	 return false;
	 	 });
	 	 this.postList = posts;
	 	 this.loadedPostList = posts;
		});
		loading.dismiss();
	 });
  	}

	btnCreateClicked(){
		this.navCtrl.push(CreatePostPage);
	}

}
