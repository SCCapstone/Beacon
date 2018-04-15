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
/**
 * Generated class for the SignupChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupChoicePage = /** @class */ (function () {
    function SignupChoicePage(menuCtrl, navCtrl, navParams) {
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl.enable(false, 'navMenu');
    }
    SignupChoicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupChoicePage');
    };
    SignupChoicePage.prototype.goToPersonalSignupPage = function () {
        this.navCtrl.push('UserSignupPage');
    };
    SignupChoicePage.prototype.goToOrganizationSignupPage = function () {
        this.navCtrl.push('OrgSignupPage');
    };
    SignupChoicePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signup-choice',
            templateUrl: 'signup-choice.html',
        }),
        __metadata("design:paramtypes", [MenuController, NavController, NavParams])
    ], SignupChoicePage);
    return SignupChoicePage;
}());
export { SignupChoicePage };
//# sourceMappingURL=signup-choice.js.map