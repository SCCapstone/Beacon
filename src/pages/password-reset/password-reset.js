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
import { IonicPage, NavController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
var PasswordResetPage = /** @class */ (function () {
    function PasswordResetPage(menuCtrl, navCtrl, alertCtrl, formBuilder, authProvider, loadingCtrl) {
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl.enable(false, 'navMenu');
        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
        });
    }
    PasswordResetPage.prototype.resetPassword = function () {
        var _this = this;
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        }
        else {
            this.authProvider.resetPassword(this.resetPasswordForm.value.email)
                .then(function (user) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: "We just sent you a reset link to your email",
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel',
                                handler: function () {
                                    _this.navCtrl.pop();
                                }
                            }
                        ]
                    });
                    alert.present();
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var errorMessage = error.message;
                    var errorAlert = _this.alertCtrl.create({
                        message: errorMessage,
                        buttons: [{ text: "Ok", role: 'cancel' }]
                    });
                    errorAlert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    PasswordResetPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-password-reset',
            templateUrl: 'password-reset.html',
        }),
        __metadata("design:paramtypes", [MenuController, NavController, AlertController,
            FormBuilder, AuthProvider,
            LoadingController])
    ], PasswordResetPage);
    return PasswordResetPage;
}());
export { PasswordResetPage };
//# sourceMappingURL=password-reset.js.map