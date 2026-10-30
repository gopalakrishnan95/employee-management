import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../employee-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm {
  protected employee = inject(EmployeeService);
  protected snackBar = inject(MatSnackBar);

  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', [Validators.required]),
  });

  saveEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }

    console.log(this.employeeForm.value);
    const emp = {
      name: this.employeeForm.value.name!,
      email: this.employeeForm.value.email!,
      department: this.employeeForm.value.department!,
    };

    this.employee.addEmployee(emp).subscribe({
      next: (response) => {
        console.log('Employee added:', response);

        this.snackBar.open('Employee Added', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },

      error: (error) => {
        console.error('Failed to add employee:', error);

        this.snackBar.open('Failed to add employee', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }
}
