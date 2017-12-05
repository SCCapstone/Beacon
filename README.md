
## Beacon

Test and working, this version of Beacon includes:

Login authentication using firebase, reset password option, signup option,
and linking between pages.

## Simulator testing
You can also test right in the simulator using the cordova commands from the previous chapter. For example, to test in the iOS simulator, run:

$ ionic cordova build ios

$ ionic cordova emulate ios

![alt text](https://raw.githubusercontent.com/SCCapstone/Beacon/master/Screen%20Shot%202017-12-05%20at%208.47.23%20AM.png?token=AWYG4rDGwnpEtWJGUJbs1TRRzVJP9be-ks5aMA7LwA%3D%3D)



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
