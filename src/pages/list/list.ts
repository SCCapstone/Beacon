import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
 
declare var google;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  name: string = "";
  constructor(public navCtrl: NavController) {
  }
  ionViewDidLoad() {
    this.initializeMap();
  }
  initializeMap() {
    let letLng = new google.maps.LatLng(34.007, -81.034);
    let mapOptions = {
      center: letLng,
      zoom: 7,
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
