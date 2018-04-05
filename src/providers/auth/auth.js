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
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
var AuthProvider = /** @class */ (function () {
    function AuthProvider(facebook) {
        this.facebook = facebook;
        var approved = "not approved";
    }
    /*
     * facebookLogin does not take in any arguments. It opens up the native facebook application or a
     * pseudo in app browser if the application is not downloaded. It asks for permissions and then
     * logs the user in if successfull
     */
    AuthProvider.prototype.facebookLogin = function (facebookCredential) {
        return firebase.auth().signInWithCredential(facebookCredential);
    };
    /**
     * loginUser takes in an email and password and signs the user into the application.
     */
    AuthProvider.prototype.loginUser = function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    /**
     * signupUser takes in an email and password and does 3 things:
     * 1. It creates the new user.
     * 2. It signs the user into the application.
     * 3. It creates a database node for the user to store the userProfile, which starts with just
     *    the email address.
     */
    AuthProvider.prototype.signupUser = function (name, email, password, phone) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (newUser) {
            firebase.database().ref('/userProfile').child(newUser.uid).set({
                username: name,
                email: email,
                phone: phone
            });
        });
    };
    AuthProvider.prototype.signupOrganization = function (orgName, contactName, contactEmail, contactPhone, address, password) {
        return firebase.auth().createUserWithEmailAndPassword(contactEmail, password).then(function (newUser) {
            firebase.database().ref('/userProfile').child(newUser.uid).set({
                organization: orgName,
                username: contactName,
                email: contactEmail,
                phone: contactPhone,
                address: address,
                approved: "not approved"
            });
        });
    };
    /**
     * resetPassword takes the email address as a string and sends the email with the reset password
     * link.
     */
    AuthProvider.prototype.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    /**
     * logoutUser doesn't take any parameters, it looks into the authentication object and signs out
     * the currently logged in user.
     */
    AuthProvider.prototype.logoutUser = function () {
        return firebase.auth().signOut();
    };
    AuthProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Facebook])
    ], AuthProvider);
    return AuthProvider;
}());
export { AuthProvider };
//# sourceMappingURL=auth.js.map