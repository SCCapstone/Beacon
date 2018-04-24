import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';

//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireList } from "angularfire2/database"; //apparently AngularFire has been outdated
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

declare var google;

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  name: string = "";
  options : GeolocationOptions;
  currentPos : Geoposition;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  public postList:Array<any>; //Is for creating a database reference so we can pull the data from Firebase.
  public loadedPostList:Array<any>; //So we dont have to call data twice from firebase
  public postRef;//:firebase.database.Reference;//Is to store the list of posts we’re pulling from Firebase.
  //public loading:Loading;
  public postsToLoad: number = 10;
  public isOrganization = false;
  public isAdmin = false;
  public isTest = true;
  public isUser = true;
  public isApprovedOrg = false;
  //public latitude: number;
  //public longitude: number;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, 
    public authProvider: AuthProvider, public loadingCtrl: LoadingController, private geolocation : Geolocation) { 

    /*this.menuCtrl.enable(true, 'navMenu');

    var UID = firebase.auth().currentUser.uid;
      var currentUserDB = firebase.database().ref('/userProfile/'+ UID);
      currentUserDB.once('value', userInfo => {
          var organization = userInfo.val().organization;
          var approvedOrg = userInfo.val().approved;
          var admin = userInfo.val().username;
          if(organization != null )
        {
            this.isOrganization = true;
            this.isUser = false;
        }
        if(approvedOrg == "approved"){
          this.isApprovedOrg = true;
          this.isOrganization = false;
        }
        if(admin == "Ryan Roe")
        {
            this.isAdmin = true;
        }
      });*/

      //this.itemsRef = fdb.list('/messages');
      //this.items = this.itemsRef.valueChanges(); //valueChanges returns an observable which is necessary for async
      /*this.postRef = firebase.database().ref('/messages').orderByChild('timestamp'); //creating a database reference

      this.postRef.limitToFirst(this.postsToLoad).once('value', postList => {
          let posts = [];
          postList.forEach( post => {
            posts.push(post.val());
            this.latitude = post.val().latitude;
            this.longitude = post.val().longitude;
            //latitude = post.val().latitude;
            //longitude = post.val().longitude;
            //latitude = post.val().latitude;
            //longitude = post.val().longitude;
            return false;
          });
          this.postList = posts;
          this.loadedPostList = posts;
        });
      */
      this.options = {
        enableHighAccuracy : false
      };
      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;     

        console.log(pos);
        this.initializeMap(pos.coords.latitude,pos.coords.longitude);

      },(err : PositionError)=>{
        console.log("error : " + err.message);
      ;
      })
    }
  //constructor(public navCtrl: NavController,private geolocation : Geolocation) {}
  ionViewDidLoad() {    
  }
  /*getUserPosition(){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;     

        console.log(pos);
        this.initializeMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
  }*/
  
  initializeMap(lat, long) {
    let letLng = new google.maps.LatLng(lat, long);
    let mapOptions = {
      center: letLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(lat, long);
  }
  addMarker(lat, long) {
    this.postRef = firebase.database().ref('/messages').orderByChild('timestamp'); //creating a database reference

      this.postRef.limitToFirst(this.postsToLoad).once('value', postList => {
          let posts = [];

          postList.forEach( post => {
            //posts.push(post.val());
            if(lat+.724 > post.val().latitude && lat-.724 < post.val().latitude && long+.724 > post.val().longitude && long-.724 < post.val().longitude){
                posts.push(post.val());
                let latitude = post.val().latitude;
                let longitude = post.val().longitude;
                let content = post.val().organization + ": " + post.val().message;
                let marker = new google.maps.Marker({
                  map: this.map,
                  animation: google.maps.Animation.DROP,
                  position: { lat: latitude, lng: longitude },
                title: content
                })
                this.addInfoWindow(marker, content);
      //let content = `<h1>Hospital</h1>`;
                //this.addInfoWindow(marker, content);
            //latitude = post.val().latitude;
            //longitude = post.val().longitude;
                //return false;
            }
            /*let latitude = post.val().latitude;
            let longitude = post.val().longitude;
            let content = post.val().organization + ": " + post.val().message;
            let marker = new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: { lat: latitude, lng: longitude },
              title: content
            })
      //let content = `<h1>Hospital</h1>`;
            this.addInfoWindow(marker, content);
            //latitude = post.val().latitude;
            //longitude = post.val().longitude;*/
            //this.addInfoWindow(marker, content);
            return false;
          });
          this.postList = posts;
          this.loadedPostList = posts;
        });
    /*let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: latitude, lng: longitude },
      //position: { lat: latitude, lng: longitude },
      title: 'Hospital'
    })
    let content = `<h1>Hospital</h1>`;
    this.addInfoWindow(marker, content);*/
  }
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      this.name = marker.title;
      infoWindow.open(this.map, marker)
    })
  }
}


