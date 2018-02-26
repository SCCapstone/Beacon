import { FormControl } from '@angular/forms';

export class PasswordValidator {
  
  static passwordsMatch(control: FormControl){
    if (control.value == control.root.value['password']) {
        console.log('passwords match');
        return null;
    } else {
        return { isValid: true };
    }
    
  }
}