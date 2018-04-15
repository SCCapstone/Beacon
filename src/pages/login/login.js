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
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
//import * as firebase from 'firebase';
//import {AngularFireDatabase} from 'angularfire2/database';
import { FeedPage } from '../feed/feed';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase'; //added 3/31
var LoginPage = /** @class */ (function () {
    function LoginPage(menuCtrl, navCtrl, navParams, loadingCtrl, alertCtrl, formBuilder, authProvider, facebook) {
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.authProvider = authProvider;
        this.facebook = facebook;
        this.menuCtrl.enable(false, 'navMenu');
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    LoginPage.prototype.facebookLogin = function () {
        var _this = this;
        this.facebook.login(['email'])
            .then(function (response) {
            var facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(response.authResponse.accessToken);
            _this.authProvider.facebookLogin(facebookCredential).then(function (authData) {
                _this.loading.dismiss().then(function () {
                    _this.navCtrl.setRoot(FeedPage);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: "Error loading facebook login",
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            _this.loading = _this.loadingCtrl.create();
            _this.loading.present();
        });
    };
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
                .then(function (authData) {
                _this.loading.dismiss().then(function () {
                    _this.navCtrl.setRoot(FeedPage);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    LoginPage.prototype.goToSignup = function () {
        this.navCtrl.push('SignupChoicePage');
    };
    LoginPage.prototype.goToResetPassword = function () {
        this.navCtrl.push('PasswordResetPage');
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [MenuController, NavController, NavParams, LoadingController,
            AlertController, FormBuilder,
            AuthProvider, Facebook])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map