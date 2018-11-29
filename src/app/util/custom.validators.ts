import {  AbstractControl} from '@angular/forms';


export class CustomValidators {
    
// Create the custom validator function 
static emailDomain(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (email === '' || domain.toLowerCase() === 'gmail.com') {
    return null;
  } else {
    return { 'emailDomain': true };
  }
}



}