import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';




import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
//Import each of the pages that you add 
import { CreatePage } from '../pages/create/create';
import { EditPage } from '../pages/edit/edit';
import { ViewPage } from '../pages/view/view';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
   //After adding new pages first add their entry components here
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreatePage,
    EditPage,
    ViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  
  //After adding new pages then add their entry components here
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreatePage,
    EditPage,
    ViewPage,
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
