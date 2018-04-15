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
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import firebase from 'firebase';
import { AngularFireDatabase } from "angularfire2/database"; //apparently AngularFire has been outdated
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(fdb, menuCtrl, navCtrl, navParams, formBuilder) {
        var _this = this;
        this.fdb = fdb;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.menuCtrl.enable(true, 'navMenu');
        //goes directly to the entry for the user based off of the USER ID. 
        this.UID = firebase.auth().currentUser.uid;
        this.currentUserDB = firebase.database().ref('/userProfile/' + this.UID);
        this.currentUserDB.once('value', function (userInfo) {
            _this.username = (userInfo.val().username);
            _this.email = userInfo.val().email;
            _this.phone = userInfo.val().phone;
            _this.organization = userInfo.val().organization;
            _this.address = userInfo.val().address;
        });
        this.organizationForm = formBuilder.group({
            organization: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            phone: ['', Validators.compose([Validators.minLength(9), Validators.required])],
            address: ['', Validators.required]
        });
        this.userForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            phone: ['', Validators.compose([Validators.minLength(9), Validators.required])]
        });
        this.passwordForm = formBuilder.group({
            currentPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            password1: ['', Validators.compose([Validators.minLength(6), Validators.required, PasswordValidator.passwordsMatch])]
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
        firebase.auth().currentUser.updateEmail(this.email);
        // An error happened.
    };
    SettingsPage.prototype.updateOrganization = function () {
        this.currentUserDB.update({ username: this.username,
            email: this.email,
            phone: this.phone,
            address: this.address,
            organization: this.organization });
        firebase.auth().currentUser.updateEmail(this.email);
    };
    SettingsPage.prototype.updatePassword = function () {
        if (firebase.auth().currentUser
            .reauthenticateWithCredential(firebase.auth.EmailAuthProvider
            .credential(firebase.auth().currentUser.email, this.passwordForm.value.currentPassword))) {
            firebase.auth().currentUser.updatePassword(this.passwordForm.value.password2).then(function () {
                console.log("password updated successfully");
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
    SettingsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-settings',
            templateUrl: 'settings.html',
        }),
        __metadata("design:paramtypes", [AngularFireDatabase, MenuController, NavController, NavParams, FormBuilder])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map