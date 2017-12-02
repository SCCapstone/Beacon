import { Component, NgZone } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OrgProfilePage } from '../pages/org-profile/org-profile';
import { FeedPage } from '../pages/feed/feed';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

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

  public zone:NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    //Angular’s change detection is triggered
    this.zone = new NgZone({});

  //Generated config variable for firebase access
    const config = {
    apiKey: "AIzaSyAnokPlPIbzJupEnZAymrxVPokY_pz0vTg",
    authDomain: "beacon-7f513.firebaseapp.com",
    databaseURL: "https://beacon-7f513.firebaseio.com",
    projectId: "beacon-7f513",
    storageBucket: "beacon-7f513.appspot.com",
    messagingSenderId: "28347407856"
    };

// used for an example of ngFor and navigation
this.pages = [

  //Homepage Nav Link
  { title: 'Home', component: HomePage },

  //Homepage List Link
  { title: 'List', component: ListPage },

  ////Homepage Organization Profile Link
  {title: 'Organization Profile', component: OrgProfilePage },

  //Homepage Beacon Feed Link
  {title: 'Beacon Feed', component: FeedPage }

];

    //initialize Firebase with app
    firebase.initializeApp(config);

    //keeps track of auth changes
    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = 'LoginPage';
        } else {
          this.rootPage = HomePage;
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
}
