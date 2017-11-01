import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



/**
**  This is where we will call each individual components to show up on the page.
**                             ** NOTICE: ** 
**  Each Component (componets here refers to the pages ) should be 
**  imported to the app.
**/


//Homepage
import { HomePage } from '../pages/home/home';
//Import List Page
import { ListPage } from '../pages/list/list';
//Import Create Page
import { CreatePage } from '../pages/create/create';
//Import Edit Profile Page
import { EditPage } from '../pages/edit/edit';
//Import View Page
import { ViewPage } from '../pages/view/view';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;


  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Create Page', component: CreatePage },
      { title: 'Edit Profile', component: EditPage },
      { title: 'View Posts', component: ViewPage },


    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
