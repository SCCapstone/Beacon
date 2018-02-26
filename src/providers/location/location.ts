import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';
/*
  Generated class for the LocationProvider provider by Ryan to retreive the current user's location.
  Also intended for functions to be used for filtering the feed by location. Hopefully to speed it up.
  This provider is defined in the bootstrap, so one instance is created for the entire app.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  
  usersLocation : {
  	lat: 33.9825421,
  	lng: -81.01630080000001
  }

  username : string = "Location Provider is working.";

  constructor(public http: Http, private geolocation: Geolocation) {
    console.log('Hello LocationProvider Provider');
    
  }


  //only returns location at instance of call, use watchPosition() for updating constantly.
  /*
	usersLocation = this.geolocation.getCurrentPosition().then((resp) => { //The then() method returns a Promise, which may take time and receives two variables either success or failure. It takes up to two arguments: callback functions for the success and failure cases of the Promise
	 	this.lat = resp.coords.latitude
	 	this.lng = resp.coords.longitude
	 	
	}).catch((error) => {
	  console.log('Error getting location', error);
	});
  
*/
	/*
	let watch = this.geolocation.watchPosition(); //this returns an observable, not a promise, which constantly tracks the user's location.
	watch.subscribe((data) => {
	 // data can be a set of coordinates, or an error (if an error occurred).
	 // data.coords.latitude
	 // data.coords.longitude
	});*/


}
