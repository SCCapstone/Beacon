import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
/**
 * Generated class for the OrgApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-org-approval',
  templateUrl: 'org-approval.html',
})
export class OrgApprovalPage {


public postsToLoad: number = 100;
public postList:Array<any>;
public loadedPostList:Array<any>;
public postRef;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	var UID = firebase.auth().currentUser.uid;
    var currentUserDB = firebase.database().ref('/userProfile/'+ UID);
   
  	this.postRef = firebase.database().ref('/userProfile');//.orderByChild('email'); //creating a database reference

  	

	this.postRef.limitToFirst(this.postsToLoad).once('value', postList => {
      let posts = [];
      	postList.forEach( post => {
     		if (post.val().approved == "not approved"){
        	posts.push(post.val());
      		}
       	 return false;
      	});
      this.postList = posts;
      this.loadedPostList = posts;
    });
  }

  refreshAdminList(){
  	this.postRef.limitToFirst(this.postsToLoad).once('value', postList => {
      let posts = [];
      	postList.forEach( post => {
     		if (post.val().approved == "not approved"){
        	posts.push(post.val());
      		}
       	 return false;
      	});
      this.postList = posts;
      this.loadedPostList = posts;
    });
  }
/*
filteritems(){
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
	}*/


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrgApprovalPage');
  }
/*
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
}*/

}
