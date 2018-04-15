var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
//import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase } from "angularfire2/database"; //apparently AngularFire has been outdated
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { FeedPage } from '../feed/feed';
import { LocationProvider } from '../../providers/location/location';
import { Geolocation } from '@ionic-native/geolocation';
var CreatePostPage = /** @class */ (function () {
    function CreatePostPage(menuCtrl, navCtrl, geolocation, navParams, fdb, afAuth, alertCtrl, locationProvider) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.fdb = fdb;
        this.alertCtrl = alertCtrl;
        this.locationProvider = locationProvider;
        this.arrData = [];
        this.postData = [];
        //options: GeolocationOptions;
        //currentPos : Geoposition;
        this.createPostMessage = "original messsage";
        this.testingPostsArr = [];
        this.UID = firebase.auth().currentUser.uid;
        this.currentUserDB = firebase.database().ref('/userProfile/' + this.UID);
        this.itemsRef = fdb.list('messages');
        this.currentUserDB.once('value', function (userInfo) {
            _this.username = (userInfo.val().username);
            _this.email = userInfo.val().email;
            _this.phone = userInfo.val().phone;
            _this.organization = userInfo.val().organization;
            _this.address = userInfo.val().address;
        });
        /*Mason I coded this function out because it was returning an error everytime the page loaded. "Uncaught (in promise): [object PositionError]" -Ryan
         this.options = {
            enableHighAccuracy: false
           };
         /*
        this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
          this.currentPos = pos;
          console.log(pos);
          //this.chatSend(theirTitle, theirMessage, pos.coords.latitude, pos.coords.longitude, theirImage, theirUser, userImageSrc);
        })*/
    }
    CreatePostPage.prototype.chatSend = function (theirTitle, theirMessage) {
        console.log(this.organization);
        var item = {
            message: theirMessage,
            title: theirTitle,
            timestamp: Date.now() * -1,
            PostType: this.typeofPost,
            email: this.email,
            organization: this.organization,
        };
        this.itemsRef.push(item);
        this.navCtrl.setRoot(FeedPage);
    };
    //functions for future adaptation
    CreatePostPage.prototype.updateItem = function (key, newText) {
        this.itemsRef.update(key, { text: newText });
    };
    CreatePostPage.prototype.deleteItem = function (key) {
        this.itemsRef.remove(key);
    };
    CreatePostPage.prototype.deleteEverything = function () {
        this.itemsRef.remove();
    };
    CreatePostPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreatePostPage');
    };
    CreatePostPage.prototype.showSelected = function (mySelect) {
        console.log(mySelect);
        this.typeofPost = mySelect;
    };
    CreatePostPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-create-post',
            templateUrl: 'create-post.html',
        }),
        __metadata("design:paramtypes", [MenuController, NavController, Geolocation, NavParams, AngularFireDatabase, AngularFireAuth,
            AlertController, LocationProvider])
    ], CreatePostPage);
    return CreatePostPage;
}());
export { CreatePostPage };
//# sourceMappingURL=create-post.js.map