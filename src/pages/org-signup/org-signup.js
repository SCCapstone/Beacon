var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { PasswordValidator } from '../../validators/password';
import { FeedPage } from '../feed/feed';
import { Camera } from '@ionic-native/Camera'; //added 3/31 by Amanda
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the OrgSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrgSignupPage = /** @class */ (function () {
    function OrgSignupPage(alertCtrl, loadingCtrl, authProvider, menuCtrl, navCtrl, navParams, formBuilder, camera, transfer, file) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authProvider = authProvider;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.menuCtrl.enable(false, 'navMenu');
        this.signupForm = formBuilder.group({
            organization: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            phone: ['', Validators.compose([Validators.minLength(9), Validators.required])],
            address: ['', Validators.required],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            password2: ['', Validators.compose([Validators.minLength(6), Validators.required, PasswordValidator.passwordsMatch])]
        });
        //this.mypicref=firebase.storage().ref('/') //giving the ref to mypicref
    }
    OrgSignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrgSignupPage');
    };
    OrgSignupPage.prototype.signupOrganization = function () {
        var _this = this;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.authProvider.signupOrganization(this.signupForm.value.organization, this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.phone, this.signupForm.value.address, this.signupForm.value.password)
                .then(function () {
                _this.loading.dismiss().then(function () {
                    _this.navCtrl.setRoot(FeedPage);
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
    OrgSignupPage.prototype.returnToLogin = function () {
        this.navCtrl.popTo(this.navCtrl.getByIndex(0));
    };
    OrgSignupPage.prototype.takePhoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var options;
            return __generator(this, function (_a) {
                options = {
                    quality: 100,
                    destinationType: this.camera.DestinationType.DATA_URL,
                    encodingType: this.camera.EncodingType.JPEG,
                    mediaType: this.camera.MediaType.PICTURE,
                    //sourceType: Camera.PictureSourceType.CAMERA,
                    saveToPhotoAlbum: true,
                    correctOrientation: true
                };
                this.camera.getPicture(options).then(function (imageData) {
                    _this.myPhoto = 'data:image/jpeg;base64,' + imageData;
                }, function (err) {
                    // Handle error
                });
                return [2 /*return*/];
            });
        });
    };
    OrgSignupPage.prototype.getPhoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var options;
            return __generator(this, function (_a) {
                options = {
                    quality: 100,
                    destinationType: this.camera.DestinationType.DATA_URL,
                    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                    saveToPhotoAlbum: false
                };
                /**
                //code from paul halliday: store images with ionic
                const result = await this.camera.getPicture(options);
                const image = 'data:image/jpeg;base64,${result}';
                const pictures = storage().ref('pictures/myPhoto');
                pictures.putString(image, 'data_url');
                */
                // code from ionic documentation and Maballo Net: pick from gallary
                this.camera.getPicture(options).then(function (imageData) {
                    _this.myPhoto = 'data:image/jpeg;base64,' + imageData;
                }, function (err) {
                    // Handle error
                });
                return [2 /*return*/];
            });
        });
    };
    OrgSignupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-org-signup',
            templateUrl: 'org-signup.html',
        }),
        __metadata("design:paramtypes", [AlertController, LoadingController, AuthProvider,
            MenuController, NavController, NavParams, FormBuilder,
            Camera, FileTransfer, File])
    ], OrgSignupPage);
    return OrgSignupPage;
}());
export { OrgSignupPage };
//# sourceMappingURL=org-signup.js.map