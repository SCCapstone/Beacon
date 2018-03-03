webpackJsonp([0],{

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSignupPageModule", function() { return UserSignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_signup__ = __webpack_require__(500);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserSignupPageModule = (function () {
    function UserSignupPageModule() {
    }
    return UserSignupPageModule;
}());
UserSignupPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__user_signup__["a" /* UserSignupPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__user_signup__["a" /* UserSignupPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__user_signup__["a" /* UserSignupPage */]
        ]
    })
], UserSignupPageModule);

//# sourceMappingURL=user-signup.module.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators_password__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__feed_feed__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UserSignupPage = (function () {
    function UserSignupPage(menuCtrl, navCtrl, loadingCtrl, alertCtrl, formBuilder, authProvider) {
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.authProvider = authProvider;
        this.menuCtrl.enable(false, 'navMenu');
        this.signupForm = formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password2: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__validators_password__["a" /* PasswordValidator */].passwordsMatch])],
            phone: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(9), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    UserSignupPage.prototype.signupUser = function () {
        var _this = this;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.authProvider.signupUser(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.phone)
                .then(function () {
                _this.loading.dismiss().then(function () {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__feed_feed__["a" /* FeedPage */]);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var errorMessage = error.message;
                    var alert = _this.alertCtrl.create({
                        message: errorMessage,
                        buttons: [{ text: "Ok", role: 'cancel' }]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    UserSignupPage.prototype.returnToLogin = function () {
        this.navCtrl.popTo(this.navCtrl.getByIndex(0));
    };
    return UserSignupPage;
}());
UserSignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-signup',template:/*ion-inline-start:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/user-signup/user-signup.html"*/'<ion-header>\n<ion-navbar color="secondary">\n    <ion-title>\n      Create an Account\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="signup">\n  <!--<img src="./../../../beacon_logo.png"> -->\n  <form [formGroup]="signupForm" (submit)="signupUser()" novalidate>\n\n    <ion-item>\n      <ion-label stacked color="primary">Name *</ion-label>\n      <ion-input  formControlName="name" placeholder="Your Full Name"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked color="primary">Email *</ion-label>\n      <ion-input formControlName="email" type="email" placeholder="Your email address"\n        [class.invalid]="!signupForm.controls.email.valid && signupForm.controls.email.dirty"></ion-input>\n    </ion-item>\n\n    <ion-item stacked class="error-message" *ngIf="!signupForm.controls.email.valid  && signupForm.controls.email.dirty">\n      <p>Please enter a valid email.</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked color="primary">Phone Number *</ion-label>\n      <ion-input formControlName="phone" placeholder="555-555-5555"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked color="primary">Password *</ion-label>\n      <ion-input formControlName="password" type="password" placeholder="Your password"\n        [class.invalid]="!signupForm.controls.password.valid && signupForm.controls.password.dirty"></ion-input>\n    </ion-item>\n\n    <ion-item class="error-message" *ngIf="!signupForm.controls.password.valid  && signupForm.controls.password.dirty">\n      <p>Your password needs more than 6 characters.</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked color="primary">Confirm Password *</ion-label>\n      <ion-input formControlName="password2" type="password" placeholder="Your password"\n        [class.invalid]="!signupForm.controls.password2.valid && signupForm.controls.password2.dirty">\n      </ion-input>\n    </ion-item>\n\n    <ion-item class="error-message" *ngIf="!signupForm.controls.password2.valid  && signupForm.controls.password2.dirty">\n      <p>Your passwords do not match.</p>\n    </ion-item>\n\n    <button ion-button block type="Submit">\n      Sign up \n    </button>\n  </form>\n  <button ion-button block type (click)="returnToLogin()">\n      Cancel\n  </button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/amandabrummett/Desktop/490/Beacon/src/pages/user-signup/user-signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */]])
], UserSignupPage);

//# sourceMappingURL=user-signup.js.map

/***/ })

});
//# sourceMappingURL=0.js.map