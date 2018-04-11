import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SMS } from '@ionic-native/sms'
import { MyApp } from './app.component'; //this imports the firebase config which is part of the exported class in app.component.ts
import { ListPage } from '../pages/list/list';
import { OrgSignupPage } from '../pages/org-signup/org-signup'; // added by Amanda
import { FeedPage } from '../pages/feed/feed'; // added by Ryan
import { CreatePostPage } from '../pages/create-post/create-post';
import { SignupChoicePage } from '../pages/signup-choice/signup-choice';
import { UserSignupPage } from '../pages/user-signup/user-signup';
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

import { storage } from 'firebase'; //added 3/31 by Amanda
import { Camera } from '@ionic-native/camera'; //added 3/31 by Amanda

    //Initialize Firebase for feed, yes it is also in app.component.ts, but I cannot seem to import config from app.component.ts without an error appearing upon the first load of ionic serve, the second load works. For now this code must stay.
 const config = {
    apiKey: "AIzaSyADsKzb4ersqTMGiWPGJZeYXMNWb1ClUj4",
    authDomain: "ionicdbtest1.firebaseapp.com",
    databaseURL: "https://ionicdbtest1.firebaseio.com",
    projectId: "ionicdbtest1",
    storageBucket: "ionicdbtest1.appspot.com",
    messagingSenderId: "207415494381"
  };

//this is the root module, it controls the rest of the app
@NgModule({
  declarations: [
    MyApp, //sets root component
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
    AngularFireDatabaseModule,//added by ryan for angularfire2
    //Firebase.initializeApp(config);
   AngularFireModule.initializeApp(config),//ryan, for angularfire2, necessary to populate feed
    AngularFireAuthModule //added by Ahmed for authentication system
  ],
  bootstrap: [IonicApp], 
  entryComponents: [ //The entryComponents array is used to define only components that are not found in html and created dynamically
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CreatePostPage,
    SMS,
    LocationProvider, //adding providers into bootstrap means that one instance is created for all components
    Geolocation,
    Facebook,
    Camera, //for image upload
  ]
})
export class AppModule {}
