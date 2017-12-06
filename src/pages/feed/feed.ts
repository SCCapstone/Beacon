import { Component, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CreatePostPage } from '../create-post/create-post';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; //apparently AngularFire has been outdated
import { Observable } from 'rxjs/Observable';

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



constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) { 

  	this.itemsRef = fdb.list('messages');
    this.items = this.itemsRef.valueChanges();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

btnCreateClicked(){
	this.navCtrl.push(CreatePostPage);
}

}
