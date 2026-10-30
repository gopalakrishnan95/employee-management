import { Routes } from '@angular/router';
import { EmployeeList } from './employee/employee-list/employee-list';
import { EmployeeForm } from './employee/employee-form/employee-form';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'emp',
    component: EmployeeList,
  },
  {
    path: 'emp/add',
    component: EmployeeForm,
  },
];
