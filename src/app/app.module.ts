import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login'; // added by Amanda
import { OrgProfilePage } from '../pages/org-profile/org-profile'; // added by Amanda
import { FeedPage } from '../pages/feed/feed'; // added by Ryan
import { CreatePostPage } from '../pages/create-post/create-post';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from "angularfire2" //ryan
import { AngularFireDatabaseModule } from "angularfire2/database"; //ryan

 // Initialize Firebase
  var config = {
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
    HomePage,
    ListPage,
    LoginPage, //addded by Amanda
    OrgProfilePage, //added by Amanda
    FeedPage,
    CreatePostPage //added by Ryan
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config)//need to get config from firebase online)
  ],
  bootstrap: [IonicApp],
  entryComponents: [ //The entryComponents array is used to define only components that are not found in html and created dynamically
    MyApp,
    HomePage,
    ListPage,
    LoginPage, //added by Amanda
    OrgProfilePage, //added by Amanda
    FeedPage,
    CreatePostPage //added by Ryan
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
