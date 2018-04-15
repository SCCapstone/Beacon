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
import { IonicPage, NavController, NavParams, LoadingController, MenuController, AlertController } from 'ionic-angular';
import { CreatePostPage } from '../create-post/create-post';
import { SearchPage } from '../search/search';
import { OrgApprovalPage } from '../org-approval/org-approval';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase } from "angularfire2/database"; //apparently AngularFire has been outdated
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
/**
 * Generated class for the FeedPage page.
 * Created by Ryan Roe for Beacon Capstone Project
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FeedPage = /** @class */ (function () {
    function FeedPage(menuCtrl, navCtrl, navParams, fdb, authProvider, loadingCtrl, alertCtrl) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        //public loading:Loading;
        this.postsToLoad = 10;
        this.isOrganization = false;
        this.isAdmin = false;
        this.isTest = true;
        this.isUser = true;
        this.isApprovedOrg = false;
        this.menuCtrl.enable(true, 'navMenu');
        var UID = firebase.auth().currentUser.uid;
        var currentUserDB = firebase.database().ref('/userProfile/' + UID);
        currentUserDB.once('value', function (userInfo) {
            var organization = userInfo.val().organization;
            var approvedOrg = userInfo.val().approved;
            var admin = userInfo.val().username;
            if (organization != null) {
                _this.isOrganization = true;
                _this.isUser = false;
            }
            if (approvedOrg == "approved") {
                _this.isApprovedOrg = true;
                _this.isOrganization = false;
            }
            if (admin == "Ryan Roe") {
                _this.isAdmin = true;
            }
        });
        //this.itemsRef = fdb.list('/messages');
        //this.items = this.itemsRef.valueChanges(); //valueChanges returns an observable which is necessary for async
        this.postRef = firebase.database().ref('/messages').orderByChild('timestamp'); //creating a database reference
        this.postRef.limitToFirst(this.postsToLoad).once('value', function (postList) {
            var posts = [];
            postList.forEach(function (post) {
                posts.push(post.val());
                return false;
            });
            _this.postList = posts;
            _this.loadedPostList = posts;
        });
    }
    FeedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedPage');
        this.doRefresh(null);
        //Search Constructor: pulls data from Firebase into postList array everytime the data changes	 
        this.menuCtrl.enable(true, 'navMenu');
    };
    FeedPage.prototype.btnCreateClicked = function () {
        this.navCtrl.push(CreatePostPage);
    };
    FeedPage.prototype.btnSearchClicked = function () {
        this.navCtrl.push(SearchPage);
    };
    FeedPage.prototype.btnOrgClicked = function () {
        this.navCtrl.push(OrgApprovalPage);
    };
    FeedPage.prototype.btnCreateClickedFalse = function () {
        if (this.isOrganization == true) {
            var alert_1 = this.alertCtrl.create({
                title: 'Sorry!',
                subTitle: 'Only approved organization profiles are able to create posts with Beacon. Please wait until we approve your account.',
                buttons: ['Dismiss']
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Sorry!',
                subTitle: 'User profiles are unable to create posts. This is designed to declutter the feed, and enable you to quickly find supplies and volunteer opportunities.',
                buttons: ['Dismiss']
            });
            alert_2.present();
        }
    };
    ;
    FeedPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation');
        this.postRef.limitToFirst(this.postsToLoad).once('value', function (postList) {
            var posts = []; //store Firebase data temporarily
            postList.forEach(function (item) {
                posts.push(item.val()); //returns the value attribute of item
                return false;
            });
            _this.postList = posts;
            _this.loadedPostList = posts;
            if (refresher != null) {
                refresher.complete();
            }
        });
    };
    FeedPage.prototype.loadMorePosts = function (scroll) {
        var _this = this;
        this.postsToLoad += 10; // or however many more you want to load
        this.postRef.limitToFirst(this.postsToLoad).once('value', function (postList) {
            var posts = [];
            postList.forEach(function (post) {
                posts.push(post.val());
                return false;
            });
            _this.postList = posts;
            _this.loadedPostList = posts;
            if (scroll != null) {
                scroll.complete();
            }
        });
    };
    FeedPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-feed',
            templateUrl: 'feed.html',
        }),
        __metadata("design:paramtypes", [MenuController, NavController, NavParams, AngularFireDatabase,
            AuthProvider, LoadingController, AlertController])
    ], FeedPage);
    return FeedPage;
}());
export { FeedPage };
//# sourceMappingURL=feed.js.map