### [About Page](https://sccapstone.github.io/Beacon/about.html)

# What is Beacon?
This application is built for people that are in emergency situations. The hope for this application is that it will allow those involved in an emergency situation, especially natural disasters to be better informed and know where they can go for help and also know where they can go to offer help. 

It is really simple to use with a feed that shows the charities, first responders and emergency services that are available and what they are offering along with any supplies that they may be asking for. There is also a map that includes pins to show where the different organizations are located/posting from. 

# Screenshots of Application

<div>
  <div style="float:left; width: 50%">
    <h3> Home Page </h3>
    <img src="https://sccapstone.github.io/Beacon/beacon_screenshots/homepage.png">
  </div>
  <div style="float:left; width: 50%">
    <h3> Home Page </h3>
    <img src="https://sccapstone.github.io/Beacon/beacon_screenshots/feedpage.png" style="float:left; width: 50%">
  </div>
</div>
<div>
  <img src="https://sccapstone.github.io/Beacon/beacon_screenshots/mappage.png" style="float:left; width: 50%">
  <img src="https://sccapstone.github.io/Beacon/beacon_screenshots/createpostpage.png" style="float:left; width: 50%">
</div>
<div>
  <img src="https://sccapstone.github.io/Beacon/beacon_screenshots/settingspage.png" style=" margin-left: auto;
    margin-right: auto; width: 50%;">
</div>




## Unit Testing by Sarah and Ryan and Behavioral Testing by Khory


If code does not work, try reinstalling necessary dependencies for Karma, Jasmine, and Protractor

You can try "sudo npm install" initially and it should install necessary dependencies:

"npm install --save-dev angular2-template-loader html-loader jasmine jasmine-spec-reporter karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter karma-sourcemap-loader karma-webpack karma-coverage-istanbul-reporter istanbul-instrumenter-loader null-loader protractor ts-loader ts-node @types/jasmine @types/node"  

"npm install protractor --save-dev
npm install -g webdriver-manager
webdriver-manager update"

Files to note:  

* test-config
* "page".spec.ts
  * specific testing for each page  
* "e2e" 
  
To run the unit tests, while in the root directory run the command:

"npm run test"

To run the behavioral tests, while in the roof directory run the command:

"protractor"


## Tested and working, Built for osx platform

### Instructions for Viewing on osx

#### executable is under

platforms/osx/build/MyApp

this version of Beacon includes:

Login authentication using firebase, reset password option, signup option, sms texting option: please download binary below:   
*This link is for what was necessary to turn in at the end of CSCE490, and is not entirely helpful now.* - Ryan Roe  
https://github.com/SCCapstone/Beacon/releases/download/1.0/Beacon-release.zip


## *Ionic View Testing*
To easily test the app on a phone without running an emulator, download the Ionic View app provided by Ionic on the App Store or Google Play Store. Use the Public share code *9421b88b*. We have an sms function on 1a090745.  

## Simulator testing

To test in the iOS simulator, run:

$ ionic cordova build ios

$ ionic cordova emulate ios


## Angularfire2

If you run into some ionic/firebase dependency issues try:

npm install firebase angularfire2 --save

## SASS for styling

Linux
If you're using a distribution of Linux, you'll need to install Ruby first. You can install Ruby through the apt package manager, rbenv, or rvm.

sudo gem install sass --no-user-install

Install Sass
Here's the quickest way we've found to start using Sass by using the command line:
Open your Terminal or Command Prompt. On the Mac the Terminal.app comes installed by default. It's located in your "Utilities" folder. On Windows, run `cmd`.

Install Sass. Ruby uses Gems to manage its various packages of code like Sass. In your open terminal window type:

gem install sass

This will install Sass and any dependencies for you. It's pretty magical. If you get an error message then it's likely you will need to use the sudo command to install the Sass gem.
It would look like:

sudo gem install sass

Double-check. You should now have Sass installed, but it never hurts to double-check. In your terminal application you can type:
sass -v
It should return Sass 3.5.1.

see sass documentation: http://sass-lang.com/

## Building Ionic App

### Make sure you upgrade node

sudo npm install n -g

https://stackoverflow.com/questions/10075990/upgrading-node-js-to-latest-version


### How To Add Platforms

* $ cordova platform add ios
* $ cordova platform add android

### OS X Platform Guide - How to run Beacon on OSX

* $ cordova platform add osx

* $ cordova prepare

* $ cordova run

reference: http://cordova.apache.org/docs/en/latest/guide/platforms/osx/index.html

### iOS platform requirements :iphone: (ipa) - How to run Beacon on an iPhone

Installing cocoapods

* sudo gem install cocoapods
https://guides.cocoapods.org/using/getting-started.html

* run 'pod setup'

### To check your current set of platforms:

* $ cordova platform ls


### To Install pre-requisites for building

To check if you satisfy requirements for building the platform:

$ cordova requirements


## Please Note: To insert your firebase credentials

Follow this path to get to app.component.ts

src/app/app.component.ts

const config = {

    //You will copy these credentials and paste into here
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
    //END

    };
