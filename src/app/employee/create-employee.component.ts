import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm : FormGroup;
  fullNameLength = 0;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      email:[''],
      skills:this.formBuilder.group({
        skillName:[''],
        experienceInYears:[''],
        proficiency:['beginner']
      })
    });
  
    this.employeeForm.get('fullName').valueChanges.subscribe((value :string)=> {
      this.fullNameLength = value.length;
    });

  /*
    this.employeeForm.get('skills').valueChanges.subscribe((value :any)=> {
      console.log(JSON.stringify(value));
    });

    this.employeeForm.valueChanges.subscribe((value :any)=> {
      console.log(JSON.stringify(value));
    });
*/
  }
  logKeyValuePairs(group:FormGroup): void{
    Object.keys(group.controls).forEach((key:string) => {
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.logKeyValuePairs(abstractControl);
      } else{
        //abstractControl.disable();
        console.log('log='+key +'value ='+abstractControl.value);
      }
    })
  }

  onLoadDataClick():void {
    this.logKeyValuePairs(this.employeeForm);
  }

 /* 
  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName:new  FormControl(),
      email:new FormControl(),
      skills:new FormGroup({
        skillName:new FormControl(),
        experienceInYears:new FormControl(),
        proficiency:new FormControl()
      })
    });
  }
  */

   /*
   onLoadDataClick():void {
    this.employeeForm.patchValue({
      fullName:"Arjun",
      email:"arjun@gmail.com",
      skills:{
        skillName:"Java",
        experienceInYears:"3",
        proficiency:"beginner"
      }
    });
   }
*/
onSubmit():void {
  console.log(this.employeeForm.value);
  console.log(this.employeeForm.controls.fullName.value);
  console.log(this.employeeForm.controls.fullName.touched);
}

}
