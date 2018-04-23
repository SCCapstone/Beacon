var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { ListPage } from '../pages/list/list';
import { FeedPage } from '../pages/feed/feed'; // added by Ryan
import { AuthProvider } from '../providers/auth/auth';
import { SettingsPage } from '../pages/settings/settings';
var MyApp = /** @class */ (function () {
    function MyApp(authProvider, platform, statusBar, splashScreen) {
        var _this = this;
        this.authProvider = authProvider;
        //Angular’s change detection is triggered
        this.zone = new NgZone({});
        var config = {
            apiKey: "AIzaSyADsKzb4ersqTMGiWPGJZeYXMNWb1ClUj4",
            authDomain: "ionicdbtest1.firebaseapp.com",
            databaseURL: "https://ionicdbtest1.firebaseio.com",
            projectId: "ionicdbtest1",
            storageBucket: "ionicdbtest1.appspot.com",
            messagingSenderId: "207415494381"
        };
        this.pages = [
            { title: 'Beacon Feed', component: FeedPage },
            { title: 'Map', component: ListPage },
            { title: 'Settings', component: SettingsPage }
        ];
        //initialize Firebase with app, angularfiremodule is initialized in module.
        firebase.initializeApp(config);
        //keeps track of auth changes
        firebase.auth().onAuthStateChanged(function (user) {
            _this.zone.run(function () {
                if (!user) {
                    _this.rootPage = 'LoginPage';
                }
                else {
                    _this.rootPage = FeedPage;
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
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [AuthProvider, Platform, StatusBar, SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map