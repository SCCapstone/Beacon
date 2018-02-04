import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SMS } from '@ionic-native/sms'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OrgProfilePage } from '../pages/org-profile/org-profile'; // added by Amanda
import { FeedPage } from '../pages/feed/feed'; // added by Ryan
import { CreatePostPage } from '../pages/create-post/create-post';

import { AngularFireModule } from "angularfire2" //ryan
import { AngularFireDatabaseModule } from "angularfire2/database"; //ryan
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AuthProvider } from '../providers/auth/auth';



/*  var config = {
    apiKey: "AIzaSyADsKzb4ersqTMGiWPGJZeYXMNWb1ClUj4",
    authDomain: "ionicdbtest1.firebaseapp.com",
    databaseURL: "https://ionicdbtest1.firebaseio.com",
    projectId: "ionicdbtest1",
    storageBucket: "ionicdbtest1.appspot.com",
    messagingSenderId: "207415494381"
  };*/


//this is the root module, it controls the rest of the app
@NgModule({
  declarations: [
    MyApp, //sets root component
    HomePage,
    ListPage,
    OrgProfilePage, //added by Amanda
    FeedPage,
    CreatePostPage //added by Ryan
  ],
    imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,//added by ryan for angularfire2
//   AngularFireModule.initializeApp(config),//ryan, for angularfire2
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [ //The entryComponents array is used to define only components that are not found in html and created dynamically
    MyApp,
    HomePage,
    ListPage,
    OrgProfilePage, //added by Amanda
    FeedPage,
    CreatePostPage //added by Ryan
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CreatePostPage,
    SMS
  ]
})
export class AppModule {}
