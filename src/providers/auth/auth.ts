import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {FormGroup, FormControl, Validators} from "@angular/forms";

import { Facebook } from '@ionic-native/facebook'

@Injectable()
export class AuthProvider {

  constructor(public facebook: Facebook) {}


  /*
   * facebookLogin does not take in any arguments. It opens up the native facebook application or a 
   * pseudo in app browser if the application is not downloaded. It asks for permissions and then 
   * logs the user in if successfull 
   */
  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        return firebase.auth().signInWithCredential(facebookCredential);
      });
  }  

  /**
   * loginUser takes in an email and password and signs the user into the application.
   */
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * signupUser takes in an email and password and does 3 things:
   * 1. It creates the new user.
   * 2. It signs the user into the application.
   * 3. It creates a database node for the user to store the userProfile, which starts with just
   *    the email address.
   */
  signupUser(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      firebase.database().ref('/userProfile').child(newUser.uid).set({
          email: email
      });
    });
  }

  /**
   * resetPassword takes the email address as a string and sends the email with the reset password
   * link.
   */
  resetPassword(email: string): Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * logoutUser doesn't take any parameters, it looks into the authentication object and signs out
   * the currently logged in user.
   */
  logoutUser(): Promise<any> {
    return firebase.auth().signOut();
  }
/*//Ryan trying to observe current user informaiton
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});*/


}
