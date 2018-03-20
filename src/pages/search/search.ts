import { Component, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, Refresher  } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; //apparently AngularFire has been outdated
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import LocationProvider from '../../providers/location/location';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

	public postList:Array<any>; //Is for creating a database reference so we can pull the data from Firebase.
	public loadedPostList:Array<any>; //So we dont have to call data twice from firebase
	public postRef;//:firebase.database.Reference;//Is to store the list of posts we’re pulling from Firebase.
	//public loading:Loading;
	public postsToLoad: number = 10;
	public isOrganization;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, 
		public authProvider: AuthProvider, public loadingCtrl: LoadingController) {

  	this.postRef = firebase.database().ref('/messages').orderByChild('timestamp');

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

  initializeItems(): void {
  	this.postList = this.loadedPostList; //This is so we don't have to call the data again from Firebase. We can just use the list we already have.
  }

  getItems(searchbar) { 
	// Reset items back to all of the items
	this.initializeItems();
	var q = searchbar.srcElement.value;// set q to the value of the searchbar
	if (!q) { // if the value is an empty string don't filter the items
	  return;
		}
	this.postList = this.postList.filter((v) => { //v is a name we are giving to our projected array from this.postList
		if(v.title && q) {
	    	if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) { //checks the string against the value of the title property
	        	return true;
	        }
	        if (v.message.toLowerCase().indexOf(q.toLowerCase()) > -1){
	        	return true;
	      	}
	      	return false;
	    }
	});
		console.log(q, this.postList.length);
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
