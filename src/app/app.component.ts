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



@Component({
  templateUrl: 'app.html'
})

export class MyApp { //this is template for the root component that is set in module.ts
// This lets us access our pages as children from the Home
@ViewChild(Nav) nav: Nav;
  /**
  **********************************************************************
  ** rootPage: any; => this is a NavController which is the base class
  ** for navigation controller components like Nav and Tab.
  ** https://ionicframework.com/docs/api/navigation/NavController/
  ** Ahmed
  *************************************************************************
  **/
  rootPage:any;
 /**
  **********************************************************************
  **  Angular 2 implements its own special zone called NgZone.
  **  This special zone extends the basic functionality of a zone to
  **  facilitate change detection
  **  https://www.joshmorony.com/understanding-zones-and-change-detection-in-ionic-2-angular-2/
  **  Ahmed
  **********************************************************************
  **/

//added this
 pages: Array<{title: string, component: any}>;
 settingsPages: Array<{title:string, component: any}>;

 public zone:NgZone;
    // used for an example of ngFor and navigation

  public isAdmin;
  public normalUser: boolean = true;

  constructor(public authProvider: AuthProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    //Angular’s change detection is triggered
    this.zone = new NgZone({});
    const config = {
      /**
        apiKey: "AIzaSyADsKzb4ersqTMGiWPGJZeYXMNWb1ClUj4",
        authDomain: "ionicdbtest1.firebaseapp.com",
        databaseURL: "https://ionicdbtest1.firebaseio.com",
        projectId: "ionicdbtest1",
        storageBucket: "ionicdbtest1.appspot.com",
        messagingSenderId: "207415494381"
        */
        apiKey: "AIzaSyBpEoYX0R1FH7_UxYCfiDOejAewqGj4Lg8",
        authDomain: "beacon-7a98f.firebaseapp.com",
        databaseURL: "https://beacon-7a98f.firebaseio.com",
        projectId: "beacon-7a98f",
        storageBucket: "beacon-7a98f.appspot.com",
        messagingSenderId: "969938786472"
      };


    this.pages = [
      {title: 'Beacon Feed', component: FeedPage },
      { title: 'Map', component: ListPage },
    ];
    
    //initialize Firebase with app, angularfiremodule is initialized in module.
    firebase.initializeApp(config);
    //keeps track of auth changes
    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = 'LoginPage';
        } else {
          this.rootPage = FeedPage;
          this.normalUser = user.providerData[0].providerId != "facebook.com";

        }
      });
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) { //used in app.html's menu
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openSettings()
  {
    this.nav.setRoot(SettingsPage);
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.nav.setRoot('LoginPage');
    });
  }

}
