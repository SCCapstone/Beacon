import { browser, element, by, ElementFinder } from 'protractor';
 
describe('Login Page:', () => {

 //In the test above, we have created two tests, and before each of the tests we redirect the 
 //browser back to the initial page with browser.get('').


beforeAll(() => {
    browser.get('');
    browser.waitForAngularEnabled(false);
  });


  /////////////////////////// STANDARD LOGIN ////////////////////////////

 /* check basic loading procedure */ 
  it('loading the home page and checking the title', () => {
    var title = element(by.css)
     expect(title == "Welcome to Beacon");

  });

  /* tests form format and input for the email input box */ 
  it('entering in email', () => {

    var loginEmail = element(by.css("input[formControlName=email]"));
    expect(loginEmail.isPresent());

    //checks gray placeholder text

    var placeholder = loginEmail.getAttribute('placeholder');
    expect(placeholder).toEqual("Your email address");
    
    //sends correct input to login 
    loginEmail.sendKeys("khoryk@email.sc.edu");
                               
  });


  /* tests form format and input for the password input box */
  it('entering in password', () => {

    var loginPassword = element(by.css("input[formControlName=password]"));
    expect(loginPassword.isPresent());

    //checks gray placeholder text

    var placeholder = loginPassword.getAttribute('placeholder');
    expect(placeholder).toEqual("Your password");

    //sends correct input to login 
    loginPassword.sendKeys('password');
  
  });

  /* confirms login button is available and confirms user can log in successfully */
  it('login button appears and can log in user', () => {

    var loginButton = element(by.buttonText('Login'));
    expect(loginButton.isPresent());

    loginButton.click().then(function() {

      browser.sleep(2000);
      
    });

  
  });

  /* return to home page */
  it('log out and return to home page', () => {

    var logoutButton = element(by.buttonText('Log Out'));
    expect(logoutButton.isPresent());


    logoutButton.click().then(function() {

      browser.sleep(2000);
      browser.get('');
    });
 
  });
 
});