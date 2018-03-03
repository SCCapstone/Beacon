webpackJsonp([8],{

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__feed_feed__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_location_location__ = __webpack_require__(267);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { AngularFireDatabase } from "angularfire2/database";
 //apparently AngularFire has been outdated




/**
 * Generated class for the CreatePostPage page.
 * Created by Ryan Roe for Beacon Capstone Project
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreatePostPage = (function () {
    function CreatePostPage(menuCtrl, navCtrl, navParams, fdb, afAuth, alertCtrl, locationProvider) {
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.alertCtrl = alertCtrl;
        this.locationProvider = locationProvider;
        this.arrData = [];
        this.postData = [];
        this.createPostMessage = "original messsage";
        this.testingPostsArr = [];
        /*this.fdb.list("/posts/").valueChanges().subscribe(_data => {
            this.arrData = _data;
    
            console.log(this.arrData);
      })*/
        this.currentUser = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().currentUser;
        if (this.currentUser != null) {
            this.name = this.currentUser.name; //logs null
            this.email = this.currentUser.email;
            this.phone = this.currentUser.userPhone; //logs null
            console.log(this.currentUser.email);
            console.log(this.currentUser.name);
            console.log(this.currentUser.userPhone);
        }
        this.itemsRef = fdb.list('messages');
        // this.items = this.itemsRef.valueChanges();//There are properties, such as valueChanges, that return an RxJS Observable. 
        //this.locationprovidermessage = this.locationProvider.username;
    }
    //Sends the post information to database
    CreatePostPage.prototype.chatSend = function (theirTitle, theirMessage, theirLocation, theirImage, theirUser, userImageSrc) {
        var item = {
            message: theirMessage,
            title: theirTitle,
            timestamp: Date.now() * -1,
            PostType: this.typeofPost,
            email: this.email,
        };
        this.itemsRef.push(item);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__feed_feed__["a" /* FeedPage */]);
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
    return CreatePostPage;
}());
CreatePostPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-create-post',template:/*ion-inline-start:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/create-post/create-post.html"*/'<!--\n  Created by Ryan Roe for Beacon Capstone Project\n\n-->\n\n<!--<p> The lattitude: {{LocationProvider.usersLocation.lat}}</p>\n<p> The longitude: {{LocationProvider.usersLocation.lon}}</p>-->\n\n<ion-header>\n\n  <ion-navbar color="secondary">\n    <ion-title> CreatePost </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding id="page10">\n  <ion-card id="newPost-card210">\n    <ion-list>\n   <!--   <form id="newPost-form17">-->\n        <ion-item color="none" id="newPost-list-item101">\n          <ion-avatar item-left>\n            <img />\n          </ion-avatar>\n          <ion-input placeholder="United Red Cross"><h2>[(ngModel)]="name">{{name}}</h2></ion-input>\n        </ion-item>\n        <ion-item id="newPost-input12">\n          <ion-label></ion-label>\n          <ion-input type="text" [(ngModel)]="postTitle" placeholder="Enter Post Title"></ion-input>\n        </ion-item>\n        <ion-item id="newPost-input10">\n          <ion-label></ion-label>\n          <ion-input type="text" [(ngModel)]="postContent" placeholder="Post Content..."></ion-input>\n        </ion-item>\n  <!--    </form> -->\n      <ion-item color="none" id="newPost-list-item100">\n        <ion-icon name="image" item-left></ion-icon>\n        Upload Image\n      </ion-item>\n    </ion-list>\n  </ion-card>\n  <!--<form id="newPost-form13">-->\n    <ion-item id="newPost-select5">\n      <ion-label>\n        Type of Request\n      </ion-label>\n      <ion-select  [(ngModel)]="selected_value" (ionChange)="showSelected(selected_value)"[ngModelOptions]="{standalone: true}">\n        <ion-option value="Supplies Request" >\n          Supplies Request\n        </ion-option>\n        <ion-option value="Supplies Pickup">\n          Supply Pickup\n        </ion-option>\n        <ion-option value="Volunteer Request">\n          Volunteer Request\n        </ion-option>\n        <ion-option value="Volunteers Available">\n          Volunteers Available\n        </ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item id="newPost-input11">\n      <ion-label>\n        Location:\n      </ion-label>\n      <ion-input type="text" placeholder=""></ion-input>\n    </ion-item>\n    <ion-item id="newPost-toggle10">\n      <ion-label>\n        Toggle\n      </ion-label>\n      <ion-toggle color="positive" checked="false"></ion-toggle>\n    </ion-item>\n    <ion-item id="newPost-checkbox1">\n      <ion-label>\n        Use Current Location\n      </ion-label>\n      <ion-checkbox></ion-checkbox>\n    </ion-item>\n    <ion-item>\n      <button id="newPost-button9" ion-button block color="positive"  (click)="chatSend( postTitle, postContent)">\n      Create Post  \n      </button>\n    </ion-item>\n    <ion-item>\n      <button id="newPost-button10" ion-button block color="positive"  (click)="showtheVar()">\n        Log the Variable on the console.\n      </button>\n    </ion-item>\n <!-- </form>-->\n</ion-content>\n'/*ion-inline-end:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/create-post/create-post.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__providers_location_location__["a" /* LocationProvider */]])
], CreatePostPage);

//# sourceMappingURL=create-post.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_email__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_password__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






 //apparently AngularFire has been outdated
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(fdb, menuCtrl, navCtrl, navParams, formBuilder) {
        var _this = this;
        this.fdb = fdb;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.menuCtrl.enable(true, 'navMenu');
        //goes directly to the entry for the user based off of the USER ID. 
        this.UID = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.uid;
        this.currentUserDB = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/userProfile/' + this.UID);
        this.currentUserDB.once('value', function (userInfo) {
            _this.username = (userInfo.val().username);
            _this.email = userInfo.val().email;
            _this.phone = userInfo.val().phone;
            _this.organization = userInfo.val().organization;
            _this.address = userInfo.val().address;
        });
        this.organizationForm = formBuilder.group({
            organization: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__validators_email__["a" /* EmailValidator */].isValid])],
            phone: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(9), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            address: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.userForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__validators_email__["a" /* EmailValidator */].isValid])],
            phone: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(9), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
        this.passwordForm = formBuilder.group({
            currentPassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password1: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_password__["a" /* PasswordValidator */].passwordsMatch])]
        });
        // this.organizationForm.get('organization').valueChanges.subscribe(value => {
        //   console.log('name has changed:', value);
        //});
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.isFacebookUser = function () {
        if (this.currentUserDB.providerId === "facebook.com") {
            return true;
        }
    };
    SettingsPage.prototype.isOrganization = function () {
        if (this.organization != null) {
            return true;
        }
        else {
            return false;
        }
    };
    SettingsPage.prototype.updateUser = function () {
        this.currentUserDB.update({ username: this.username,
            email: this.email,
            phone: this.phone });
        __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.updateEmail(this.email);
        // An error happened.
    };
    SettingsPage.prototype.updateOrganization = function () {
        this.currentUserDB.update({ username: this.username,
            email: this.email,
            phone: this.phone,
            address: this.address,
            organization: this.organization });
        __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.updateEmail(this.email);
    };
    SettingsPage.prototype.updatePassword = function () {
        if (__WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser
            .reauthenticateWithCredential(__WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth.EmailAuthProvider
            .credential(__WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.email, this.passwordForm.value.currentPassword))) {
            __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.updatePassword(this.passwordForm.value.password2).then(function () {
                console.log("password updated successfully");
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/settings/settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="secondary">\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Profile Settings</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n<!--<form novalidate -->\n  <div *ngIf="!isFacebookUser()">\n    <h2>Account Credentials</h2>\n    <ion-list *ngIf="!isOrganization()">\n      <!--ion-item>\n        <ion-label stacked color="primary">Name</ion-label>\n        <ion-input placeholder="Your Name" [(ngModel)]="email">{{email}}</ion-input>\n      </ion-item-->\n          <ion-label>\n      </ion-label>\n      <form [formGroup]="userForm" (submit)="updateUser()" novalidate>\n\n        <ion-item>\n          <ion-label stacked color="primary">Email</ion-label>\n          <ion-input type="email" placeholder="Your Email" formControlName="email" [(ngModel)]="email">\n            {{email}}\n          </ion-input>\n        </ion-item>\n\n      	<ion-item>\n          <ion-label stacked color="primary">Phone Number *</ion-label>\n          <ion-input placeholder="555-555-5555"  formControlName = "phone" [(ngModel)]="phone">\n            {{phone}}\n          </ion-input>\n        </ion-item>\n\n        <button ion-button block type [disabled]="!userForm.valid">\n          Update Credentials\n      	</button>\n      </form>\n    </ion-list>\n    <ion-list *ngIf="isOrganization()">\n      <form [formGroup]="organizationForm" (submit)="updateOrganization()" novalidate>\n        <ion-item>\n          <ion-label stacked color="primary">Organization Name *</ion-label>\n          <ion-input type="text" formControlName="organization" placeholder="Your Organization Name" [(ngModel)]="organization">\n            {{organization}}\n          </ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked color="primary" >Contact\'s Name *</ion-label>\n          <ion-input type="text" formControlName="name" placeholder="Your Name" [(ngModel)]="username">\n            {{username}}\n          </ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked color="primary" >Contact\'s email *</ion-label>\n          <ion-input type="email" formControlName="email" placeholder="Your Email"[(ngModel)]="email">\n            {{email}}\n          </ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked color="primary" >Contact\'s Phone Number *</ion-label>\n          <ion-input type="tel" formControlName="phone" placeholder="555-555-5555" [(ngModel)]="phone">{{phone}}</ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked color="primary" >Address *</ion-label>\n          <ion-input type="text" formControlName="address" placeholder="Street Address, City, State" [(ngModel)]="address">\n          {{address}}\n        </ion-input>\n        </ion-item>\n        <button ion-button block type [disabled]="!organizationForm.valid">\n          Update Credentials\n        </button>\n      </form>\n    </ion-list>\n\n    <ion-list>\n      <ion-label>\n        <h2>Change Password</h2>\n      </ion-label>\n\n      <form [formGroup]="passwordForm" (submit)="updatePassword()" novalidate>\n\n        <ion-item>\n          <ion-label stacked color="primary">Current Password</ion-label>\n          <ion-input type="password" placeholder="Your New Password" formControlName="currentPassword"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked color="primary">New Password</ion-label>\n          <ion-input type="password" placeholder="Your New Password" formControlName="password"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked color="primary">Confirm New Password</ion-label>\n          <ion-input type="password" placeholder="Your New Password" formControlName="password1"></ion-input>\n        </ion-item>\n        <button ion-button block type [disabled]="!passwordForm.valid">\n          Update Password\n        </button>\n      </form>\n    </ion-list>\n  </div>\n<!--/form-->\n</ion-content>\n'/*ion-inline-end:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/settings/settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/create-post/create-post.module": [
		488,
		7
	],
	"../pages/feed/feed.module": [
		489,
		6
	],
	"../pages/login/login.module": [
		490,
		4
	],
	"../pages/org-signup/org-signup.module": [
		491,
		3
	],
	"../pages/password-reset/password-reset.module": [
		492,
		2
	],
	"../pages/settings/settings.module": [
		493,
		5
	],
	"../pages/signup-choice/signup-choice.module": [
		494,
		1
	],
	"../pages/user-signup/user-signup.module": [
		495,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 206;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(268);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the LocationProvider provider by Ryan to retreive the current user's location.
  Also intended for functions to be used for filtering the feed by location. Hopefully to speed it up.
  This provider is defined in the bootstrap, so one instance is created for the entire app.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LocationProvider = (function () {
    function LocationProvider(http, geolocation) {
        this.http = http;
        this.geolocation = geolocation;
        this.username = "Location Provider is working.";
        console.log('Hello LocationProvider Provider');
    }
    return LocationProvider;
}());
LocationProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
], LocationProvider);

//# sourceMappingURL=location.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(menuCtrl, navCtrl) {
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.name = "";
        this.menuCtrl.enable(true, 'navMenu');
    }
    ListPage.prototype.ionViewDidLoad = function () {
        this.initializeMap();
    };
    ListPage.prototype.initializeMap = function () {
        var letLng = new google.maps.LatLng(34.007, -81.034);
        var mapOptions = {
            center: letLng,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker();
    };
    ListPage.prototype.addMarker = function () {
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: { lat: 34.007, lng: -81.034 },
            title: 'Hospital'
        });
        var content = "<h1>Hospital</h1>";
        this.addInfoWindow(marker, content);
    };
    ListPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            _this.name = marker.title;
            infoWindow.open(_this.map, marker);
        });
    };
    return ListPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], ListPage.prototype, "mapElement", void 0);
ListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar color="secondary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Map</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div #map id="map">\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/list/list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], ListPage);

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.isValid = function (control) {
        var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);
        if (re) {
            return null;
        }
        return {
            "invalidEmail": true
        };
    };
    return EmailValidator;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordValidator; });
var PasswordValidator = (function () {
    function PasswordValidator() {
    }
    PasswordValidator.passwordsMatch = function (control) {
        if (control.value == control.root.value['password']) {
            console.log('passwords match');
            return null;
        }
        else {
            return { isValid: true };
        }
    };
    return PasswordValidator;
}());

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(329);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_sms__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_list_list__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_feed_feed__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_create_post_create_post__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_auth_auth__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_location_location__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_facebook__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







 //this imports the firebase config which is part of the exported class in app.component.ts

 // added by Ryan


 //ryan
 //ryan
 //might need to import AngularFireAuth




//Initialize Firebase for feed, yes it is also in app.component.ts, but I cannot seem to import config from app.component.ts without an error appearing upon the first load of ionic serve, the second load works. For now this code must stay.
var config = {
    apiKey: "AIzaSyADsKzb4ersqTMGiWPGJZeYXMNWb1ClUj4",
    authDomain: "ionicdbtest1.firebaseapp.com",
    databaseURL: "https://ionicdbtest1.firebaseio.com",
    projectId: "ionicdbtest1",
    storageBucket: "ionicdbtest1.appspot.com",
    messagingSenderId: "207415494381"
};
//this is the root module, it controls the rest of the app
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_feed_feed__["a" /* FeedPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_create_post_create_post__["a" /* CreatePostPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/create-post/create-post.module#CreatePostPageModule', name: 'CreatePostPage', segment: 'create-post', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/feed/feed.module#FeedPageModule', name: 'FeedPage', segment: 'feed', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/org-signup/org-signup.module#OrgSignupPageModule', name: 'OrgSignupPage', segment: 'org-signup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/password-reset/password-reset.module#PasswordResetPageModule', name: 'PasswordResetPage', segment: 'password-reset', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/signup-choice/signup-choice.module#SignupChoicePageModule', name: 'SignupChoicePage', segment: 'signup-choice', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/user-signup/user-signup.module#UserSignupPageModule', name: 'UserSignupPage', segment: 'user-signup', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            //Firebase.initializeApp(config);
            __WEBPACK_IMPORTED_MODULE_12_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
            __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__["b" /* AngularFireAuthModule */] //added by Ahmed for authentication system
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_list_list__["a" /* ListPage */],
            // OrgProfilePage, //added by Amanda
            __WEBPACK_IMPORTED_MODULE_9__pages_feed_feed__["a" /* FeedPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_create_post_create_post__["a" /* CreatePostPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_15__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_10__pages_create_post_create_post__["a" /* CreatePostPage */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_sms__["a" /* SMS */],
            __WEBPACK_IMPORTED_MODULE_16__providers_location_location__["a" /* LocationProvider */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_facebook__["a" /* Facebook */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_feed_feed__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_settings_settings__ = __webpack_require__(152);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








 // added by Ryan


var MyApp = (function () {
    // used for an example of ngFor and navigation
    function MyApp(authProvider, platform, statusBar, splashScreen) {
        var _this = this;
        this.authProvider = authProvider;
        //Angular’s change detection is triggered
        this.zone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]({});
        var config = {
            apiKey: "AIzaSyADsKzb4ersqTMGiWPGJZeYXMNWb1ClUj4",
            authDomain: "ionicdbtest1.firebaseapp.com",
            databaseURL: "https://ionicdbtest1.firebaseio.com",
            projectId: "ionicdbtest1",
            storageBucket: "ionicdbtest1.appspot.com",
            messagingSenderId: "207415494381"
        };
        this.pages = [
            { title: 'Beacon Feed', component: __WEBPACK_IMPORTED_MODULE_6__pages_feed_feed__["a" /* FeedPage */] },
            { title: 'Map', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_8__pages_settings_settings__["a" /* SettingsPage */] }
        ];
        //initialize Firebase with app, angularfiremodule is initialized in module.
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.initializeApp(config);
        //keeps track of auth changes
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
            _this.zone.run(function () {
                if (!user) {
                    _this.rootPage = 'LoginPage';
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_feed_feed__["a" /* FeedPage */];
                    var email = user.email;
                }
            });
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logMeOut = function () {
        var _this = this;
        this.authProvider.logoutUser().then(function () {
            _this.nav.setRoot('LoginPage');
        });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/amandabrummett/Desktop/490/Beacon/src/app/app.html"*/'<!--This is the main template for the app, content tells it where to rotate aroud, this first part is all the main template for the navbar until </ion-menu>, ion-nav is the main content of the page -->\n<ion-menu [content]="content" id="navMenu">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      <button menuClose ion-item (click)="logMeOut()">\n        Sign Out\n      </button>\n\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/amandabrummett/Desktop/490/Beacon/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_post_create_post__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { AngularFire, FirebaseListObservable } from 'angularfire2';
 //apparently AngularFire has been outdated


/**
 * Generated class for the FeedPage page.
 * Created by Ryan Roe for Beacon Capstone Project
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FeedPage = (function () {
    function FeedPage(menuCtrl, navCtrl, navParams, fdb, authProvider, loadingCtrl) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        //public loading:Loading;
        this.postsToLoad = 10;
        this.menuCtrl.enable(true, 'navMenu');
        //this.itemsRef = fdb.list('/messages');
        //this.items = this.itemsRef.valueChanges(); //valueChanges returns an observable which is necessary for async
        this.postRef = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/messages').orderByChild('timestamp'); //creating a database reference
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
    FeedPage.prototype.initializeItems = function () {
        this.postList = this.loadedPostList; //This is so we don't have to call the data again from Firebase. We can just use the list we already have.
    };
    FeedPage.prototype.getItems = function (searchbar) {
        // Reset items back to all of the items
        this.initializeItems();
        var q = searchbar.srcElement.value; // set q to the value of the searchbar
        if (!q) {
            return;
        }
        this.postList = this.postList.filter(function (v) {
            if (v.title && q) {
                if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
        console.log(q, this.postList.length);
    };
    FeedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedPage');
        this.doRefresh(null);
        //Search Constructor: pulls data from Firebase into postList array everytime the data changes	 
        this.menuCtrl.enable(true, 'navMenu');
    };
    FeedPage.prototype.btnCreateClicked = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__create_post_create_post__["a" /* CreatePostPage */]);
    };
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
    return FeedPage;
}());
FeedPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-feed',template:/*ion-inline-start:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/feed/feed.html"*/'<!--\n  Created by Ryan Roe for Beacon Capstone Project\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n<ion-navbar color="secondary">\n        <ion-title> Beacon Feed</ion-title>\n        <ion-buttons left>\n          <button ion-button menuToggle icon-only>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-buttons> \n         <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n         <ion-buttons right>\n            <button (click) = "btnCreateClicked()" ion-button icon-only>\n              <ion-icon name=\'create\' is-active="false"></ion-icon>\n            </button>\n         </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content\n      pullingIcon="arrow-dropdown"\n      pullingText="Pull to refresh"\n      refreshingSpinner="circles"\n      refreshingText="Refreshing..."></ion-refresher-content>\n  </ion-refresher>\n\n<!--html template for the title, username, avatar, and date-->\n\n\n <!-- div class="chat-container" *ngFor=" let item of postList "> <!-- | orderBy: \'-timestamp\' > <!--let variable items be of type items, |async automatically checks for new updates-->\n <ion-list>\n    <ion-card *ngFor=" let item of postList ">\n      <!--Avatar image, title, and timestamp-->\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="assets/imgs/m48040100_ButtonLogo200.jpg" alt="Stock Profile Image">\n        </ion-avatar>\n        <h2>{{item.title}}</h2>\n        <h2>{{item.email}} </h2>\n        <p>{{item.timestamp*(-1)  | date:\'yyyy-MM-dd HH:mm:ss Z\'}}</p> <span> </span> <p>{{item.PostType}}</p>\n      </ion-item>\n\n      <!--creates the card content using two way data linking for an async for loop-->\n      <ion-card-content>\n        <a href="#">{{item.name}}</a>\n        <p>{{item.message}}</p>\n      </ion-card-content>\n      <!--Creates the likes, comments, and time since post-->\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small>\n          <ion-icon name="thumbs-up"></ion-icon>\n          <div>0 Likes</div>\n        </button>\n      </ion-col>\n\n      <ion-col>\n        <button ion-button icon-left clear small>\n        <ion-icon name="text"></ion-icon>\n        <div>0 Comments</div>\n        </button>\n      </ion-col>\n\n      <ion-col center text-center>\n        <ion-note>\n          <!--11h ago-->\n        </ion-note>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n</ion-list>\n\n<ion-infinite-scroll (ionInfinite)="loadMorePosts($event)">\n <ion-infinite-scroll-content></ion-infinite-scroll-content>\n</ion-infinite-scroll>\n\n  <!--/div-->\n\n</ion-content>\n'/*ion-inline-end:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/feed/feed.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], FeedPage);

//# sourceMappingURL=feed.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthProvider = (function () {
    function AuthProvider(facebook) {
        this.facebook = facebook;
    }
    /*
     * facebookLogin does not take in any arguments. It opens up the native facebook application or a
     * pseudo in app browser if the application is not downloaded. It asks for permissions and then
     * logs the user in if successfull
     */
    AuthProvider.prototype.facebookLogin = function (facebookCredential) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signInWithCredential(facebookCredential);
    };
    /**
     * loginUser takes in an email and password and signs the user into the application.
     */
    AuthProvider.prototype.loginUser = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
    };
    /**
     * signupUser takes in an email and password and does 3 things:
     * 1. It creates the new user.
     * 2. It signs the user into the application.
     * 3. It creates a database node for the user to store the userProfile, which starts with just
     *    the email address.
     */
    AuthProvider.prototype.signupUser = function (name, email, password, phone) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().createUserWithEmailAndPassword(email, password).then(function (newUser) {
            __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/userProfile').child(newUser.uid).set({
                username: name,
                email: email,
                phone: phone
            });
        });
    };
    AuthProvider.prototype.signupOrganization = function (orgName, contactName, contactEmail, contactPhone, address, password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().createUserWithEmailAndPassword(contactEmail, password).then(function (newUser) {
            __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/userProfile').child(newUser.uid).set({
                organization: orgName,
                username: contactName,
                email: contactEmail,
                phone: contactPhone,
                address: address
            });
        });
    };
    /**
     * resetPassword takes the email address as a string and sends the email with the reset password
     * link.
     */
    AuthProvider.prototype.resetPassword = function (email) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().sendPasswordResetEmail(email);
    };
    /**
     * logoutUser doesn't take any parameters, it looks into the authentication object and signs out
     * the currently logged in user.
     */
    AuthProvider.prototype.logoutUser = function () {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signOut();
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */]])
], AuthProvider);

//# sourceMappingURL=auth.js.map

/***/ })

},[313]);
//# sourceMappingURL=main.js.map