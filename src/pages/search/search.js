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
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database"; //apparently AngularFire has been outdated
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchPage = /** @class */ (function () {
    function SearchPage(menuCtrl, navCtrl, navParams, fdb, authProvider, loadingCtrl) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        //public loading:Loading;
        this.postsToLoad = 10;
        this.postRef = firebase.database().ref('/messages').orderByChild('timestamp');
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
    SearchPage.prototype.initializeItems = function () {
        this.postList = this.loadedPostList; //This is so we don't have to call the data again from Firebase. We can just use the list we already have.
    };
    SearchPage.prototype.getItems = function (searchbar) {
        // Reset items back to all of the items
        this.initializeItems();
        var q = searchbar.srcElement.value; // set q to the value of the searchbar
        if (!q) { // if the value is an empty string don't filter the items
            return;
        }
        this.postList = this.postList.filter(function (v) {
            if (v.title && q) {
                if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) { //checks the string against the value of the title property
                    return true;
                }
                if (v.message.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
        console.log(q, this.postList.length);
    };
    SearchPage.prototype.loadMorePosts = function (scroll) {
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
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
    };
    SearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-search',
            templateUrl: 'search.html',
        }),
        __metadata("design:paramtypes", [MenuController, NavController, NavParams, AngularFireDatabase,
            AuthProvider, LoadingController])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.js.map