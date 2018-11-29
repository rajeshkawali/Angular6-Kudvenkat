import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { DepartmentComponent } from './department/department.component';
import { UpdateEmployeesComponent } from './employee/update-employees.component';
import { SkillsEmployeesComponent } from './employee/skills-employees.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateEmployeeComponent
  },
  {
    path: 'edit/:id',
    component: SkillsEmployeesComponent
  },
  {
    path: 'list',
    component: ListEmployeesComponent
  },
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: 'update',
    component: UpdateEmployeesComponent
  },
  {
    path: 'skills',
    component: SkillsEmployeesComponent
  }
  /*
  {
    path: 'details/:id',
    component: DetailsComponent
  }
*/
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


