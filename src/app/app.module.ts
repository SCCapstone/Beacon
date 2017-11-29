import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login'; // added by Amanda
import { OrgProfilePage } from '../pages/org-profile/org-profile'; // added by Amanda
import { FeedPage } from '../pages/feed/feed'; // added by Ryan


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//this is the root module, it controls the rest of the app
@NgModule({
  declarations: [
    MyApp, //sets root component
    HomePage,
    ListPage,
    LoginPage, //addded by Amanda
    OrgProfilePage, //added by Amanda
    FeedPage, //added by Ryan
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [ //The entryComponents array is used to define only components that are not found in html and created dynamically
    MyApp,
    HomePage,
    ListPage,
    LoginPage, //added by Amanda
    OrgProfilePage, //added by Amanda
    FeedPage, //added by Ryan
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
