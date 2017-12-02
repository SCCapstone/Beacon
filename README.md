
#Beacon

Test and working, this version of Beacon includes:

Login authentication using firebase, reset password option, signup option,
and linking between pages.

## Angularfire2

If you run into some ionic/firebase dependency issues try:

npm install firebase angularfire2 --save

## Please Note: To insert your firebase credentials

Follow this path to get to app.component.ts

src/app/app.component.ts

const config = {

    //You will copy these credentials and paste into here
    apiKey: "AIzaSyAnokPlPIbzJupEnZAymrxVPokY_pz0vTg",
    authDomain: "beacon-7f513.firebaseapp.com",
    databaseURL: "https://beacon-7f513.firebaseio.com",
    projectId: "beacon-7f513",
    storageBucket: "beacon-7f513.appspot.com",
    messagingSenderId: "28347407856"
    //END

    };
