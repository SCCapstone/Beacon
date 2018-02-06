import { browser, element, by, ElementFinder } from 'protractor';
 
describe('Create an Account page testing: ', () => {

 //In the test above, we have created two tests, and before each of the tests we redirect the 
 //browser back to the initial page with browser.get('').


  beforeAll(() => {
    browser.get('');
    browser.sleep(500);
    browser.waitForAngularEnabled(false);
  });

/////////////////////////// CREATE NEW ACCOUNT BUTTON ////////////////////////////

  it('verify create new button existence and transition to sign up', () => {

    var loginButton = element(by.buttonText('Create a new account'));
    expect(loginButton.isPresent());


    loginButton.click().then(function() {

      browser.sleep(1000);

      //updates browser to new page to find the elements
      browser.get('/#/signup');
    });

    expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/signup");
  });

//////////////////////////// CREATE A NEW ACCOUNT PROCESS /////////////////////////////////

  it('verify email input existence and populate credentials', () => {

    var loginEmail = element(by.css("input[formControlName=email]"));
    expect(loginEmail.isPresent());

    //checks gray placeholder text

    var placeholder = loginEmail.getAttribute('placeholder');
    expect(placeholder).toEqual("Your email address");

    //sends correct input to login 
    loginEmail.sendKeys("test2@email.sc.edu");
                               
  });

  it('verify password input existence and populate credentials', () => {

    var loginPassword = element(by.css("input[formControlName=password]"));
    expect(loginPassword.isPresent());

    //checks gray placeholder text

    var placeholder = loginPassword.getAttribute('placeholder');
    expect(placeholder).toEqual("Your password");

    //sends correct input to login 
    loginPassword.sendKeys('password');
  
  });

  it('submit new account information', () => {

    var loginButton = element(by.buttonText('Create an Account'));
    expect(loginButton.isPresent());


    loginButton.click().then(function() {

      browser.sleep(2000);
    });
  
  });


  it('log out and return to home page (FAILS IF ACCOUNT CREDENTIALS EXIST)', () => {

    var logoutButton = element(by.buttonText('Log Out'));
    expect(logoutButton.isPresent());

    logoutButton.click().then(function() {
      
      browser.sleep(2000);
      
    });
    browser.get('');
  });

});