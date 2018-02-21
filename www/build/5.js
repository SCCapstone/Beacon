webpackJsonp([5],{

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrgProfilePageModule", function() { return OrgProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__org_profile__ = __webpack_require__(493);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OrgProfilePageModule = (function () {
    function OrgProfilePageModule() {
    }
    return OrgProfilePageModule;
}());
OrgProfilePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__org_profile__["a" /* OrgProfilePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__org_profile__["a" /* OrgProfilePage */]),
        ],
    })
], OrgProfilePageModule);

//# sourceMappingURL=org-profile.module.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrgProfilePage; });
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


/**
 * Generated class for the OrgProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrgProfilePage = (function () {
    function OrgProfilePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    OrgProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrgProfilePage');
    };
    return OrgProfilePage;
}());
OrgProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-org-profile',template:/*ion-inline-start:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/org-profile/org-profile.html"*/'<!--\n  Generated template for the OrgProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n<ion-navbar color="red">\n  	 <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Organization Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-label color="primary">Organization Name*</ion-label>\n    <ion-input type="email" placeholder="enter text here"></ion-input>\n  </ion-item>\n\n   <ion-item>\n    <ion-label color="primary" >Password*</ion-label>\n    <ion-input type="email" placeholder="enter text here"></ion-input>\n  </ion-item>\n\n   <ion-item>\n    <ion-label color="primary" >Confirm Password*</ion-label>\n    <ion-input type="email" placeholder="enter text here"></ion-input>\n  </ion-item>\n\n   <ion-item>\n    <ion-label color="primary" >Contact\'s Name*</ion-label>\n    <ion-input type="email" placeholder="enter text here"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label color="primary" >Contact\'s email*</ion-label>\n    <ion-input type="password" placeholder="enter text here"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label color="primary" >Contact\'s Phone Number*</ion-label>\n    <ion-input type="password" placeholder="enter text here"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label color="primary" >Contact\'s email*</ion-label>\n    <ion-input type="password" placeholder="enter text here"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label color="primary" >Address*</ion-label>\n    <ion-input type="password" placeholder="enter text here"></ion-input>\n  </ion-item>\n\n<button ion-button round>Submit</button>\n\n<button ion-button round>Cancle</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/org-profile/org-profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], OrgProfilePage);

//# sourceMappingURL=org-profile.js.map

/***/ })

});
//# sourceMappingURL=5.js.map