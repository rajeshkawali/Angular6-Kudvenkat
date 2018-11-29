import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../util/custom.validators';

@Component({
  selector: 'app-update-employees',
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.css']
})
export class UpdateEmployeesComponent implements OnInit {


  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 2 characters.',
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be gmail.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.',
      // 'emailDomain': 'Email domian should be gmail.com'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email do not match.'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };

  ngOnInit() {
    // Include FormControls for contactPreference, email & phone
    // contactPreference has email as the default value
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain]],
        confirmEmail: ['', Validators.required],
      }, { validator: matchEmails }),
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      }),
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });
  }

  // If the Selected Radio Button value is "phone", then add the
  // required validator function otherwise remove it
  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.controls.fullName.value);
    console.log(this.employeeForm.controls.fullName.touched);
  }

  onLoadDataClick(): void {
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // Loop through nested form groups and form controls to check
      // for validation errors. For the form groups and form controls
      // that have failed validation, retrieve the corresponding
      // validation message from validationMessages object and store
      // it in the formErrors object. The UI binds to the formErrors
      // object properties to display the validation errors.
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  /*
    logValidationErrors(group: FormGroup = this.employeeForm): void {
      Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);
        if (abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl);
        } else {
          this.formErrors[key] = '';
          if (abstractControl && !abstractControl.valid
            && (abstractControl.touched || abstractControl.dirty)) {
            const messages = this.validationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
              }
            }
          }
        }
      });
    }
  
    */
}


function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}


// // Create the custom validator function 
// function emailDomain(control: AbstractControl): { [key: string]: any } | null {
//   const email: string = control.value;
//   const domain = email.substring(email.lastIndexOf('@') + 1);
//   if (email === '' || domain.toLowerCase() === 'gmail.com') {
//     return null;
//   } else {
//     return { 'emailDomain': true };
//   }
// }