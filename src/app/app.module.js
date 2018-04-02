var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SMS } from '@ionic-native/sms';
import { MyApp } from './app.component'; //this imports the firebase config which is part of the exported class in app.component.ts
import { ListPage } from '../pages/list/list';
import { FeedPage } from '../pages/feed/feed'; // added by Ryan
import { CreatePostPage } from '../pages/create-post/create-post';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { OrgApprovalPage } from '../pages/org-approval/org-approval';
import { AngularFireModule } from "angularfire2"; //ryan
import { AngularFireDatabaseModule } from "angularfire2/database"; //ryan
import { AngularFireAuthModule } from 'angularfire2/auth'; //might need to import AngularFireAuth
import { AuthProvider } from '../providers/auth/auth';
import { LocationProvider } from '../providers/location/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/Camera'; //added 3/31 by Amanda
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
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
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                ListPage,
                FeedPage,
                CreatePostPage,
                SettingsPage,
                SearchPage,
                OrgApprovalPage
            ],
            imports: [
                BrowserModule,
                HttpModule,
                IonicModule.forRoot(MyApp),
                AngularFireDatabaseModule,
                //Firebase.initializeApp(config);
                AngularFireModule.initializeApp(config),
                AngularFireAuthModule //added by Ahmed for authentication system
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                ListPage,
                FeedPage,
                CreatePostPage,
                SettingsPage,
                SearchPage,
                OrgApprovalPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                AuthProvider,
                CreatePostPage,
                SMS,
                LocationProvider,
                Geolocation,
                Facebook,
                Camera,
                File,
                FileTransfer,
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map