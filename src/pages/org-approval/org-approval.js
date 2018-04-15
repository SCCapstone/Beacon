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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the OrgApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrgApprovalPage = /** @class */ (function () {
    function OrgApprovalPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.postsToLoad = 100;
        var UID = firebase.auth().currentUser.uid;
        var currentUserDB = firebase.database().ref('/userProfile/' + UID);
        this.postRef = firebase.database().ref('/userProfile'); //.orderByChild('email'); //creating a database reference
        this.postRef.limitToFirst(this.postsToLoad).once('value', function (postList) {
            var posts = [];
            postList.forEach(function (post) {
                if (post.val().approved == "not approved") {
                    posts.push(post.val());
                }
                return false;
            });
            _this.postList = posts;
            _this.loadedPostList = posts;
        });
    }
    OrgApprovalPage.prototype.refreshAdminList = function () {
        var _this = this;
        this.postRef.limitToFirst(this.postsToLoad).once('value', function (postList) {
            var posts = [];
            postList.forEach(function (post) {
                if (post.val().approved == "not approved") {
                    posts.push(post.val());
                }
                return false;
            });
            _this.postList = posts;
            _this.loadedPostList = posts;
        });
    };
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
    OrgApprovalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrgApprovalPage');
    };
    OrgApprovalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-org-approval',
            templateUrl: 'org-approval.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], OrgApprovalPage);
    return OrgApprovalPage;
}());
export { OrgApprovalPage };
//# sourceMappingURL=org-approval.js.map