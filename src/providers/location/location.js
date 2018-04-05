var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var LocationProvider = /** @class */ (function () {
    function LocationProvider(http, geolocation) {
        this.http = http;
        this.geolocation = geolocation;
        this.username = "Location Provider is working.";
        console.log('Hello LocationProvider Provider');
    }
    LocationProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Geolocation])
    ], LocationProvider);
    return LocationProvider;
}());
export { LocationProvider };
//# sourceMappingURL=location.js.map