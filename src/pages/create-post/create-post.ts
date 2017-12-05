import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
//import {firebase} from 'firebase';

/**
 * Generated class for the CreatePostPage page.
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



  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
  	this.fdb.list("/posts/").valueChanges().subscribe(_data => {
		this.arrData = _data;

		console.log(this.arrData);
  })
}

createPost(postTitle: string , postContent: string): void {
	this.fdb.list("/posts/").push(this.postTitle);//pushing data to database
	this.fdb.list("/posts/").push(this.postContent);
}




  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePostPage');
  }

}
