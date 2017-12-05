var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import firebase from 'firebase';
import { Injectable } from '@angular/core';
var AuthData = /** @class */ (function () {
    function AuthData() {
    }
    //the login function
    AuthData.prototype.loginUser = function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    //Sign up
    AuthData.prototype.signupUser = function (email, password) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (newUser) {
            // creating the new user and login them into the app
            firebase
                .database()
                .ref('/userProfile')
                .child(newUser.uid)
                .set({ email: email });
        });
    };
    //reset pass
    AuthData.prototype.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    //logout
    AuthData.prototype.logoutUser = function () {
        return firebase.auth().signOut();
    };
    AuthData = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], AuthData);
    return AuthData;
}());
export { AuthData };
//# sourceMappingURL=auth.js.map