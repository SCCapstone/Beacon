import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
 
declare var google;

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
  constructor(public navCtrl: NavController,private geolocation : Geolocation) {}
  ionViewDidLoad() {    
    this.getUserPosition()
  }
  getUserPosition(){
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
  
  initializeMap(lat, long) {
    let letLng = new google.maps.LatLng(lat, long);
    let mapOptions = {
      center: letLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
  }
  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: 34.007, lng: -81.034 },
      title: 'Hospital'
    })
    let content = `<h1>Hospital</h1>`;
    this.addInfoWindow(marker, content);
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
