import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../employee-service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, MatPaginatorModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  columnsToDisplay = ['id', 'name', 'email', 'department', 'delete'];

  protected empService = inject(EmployeeService);
  employees = signal<Employee[]>([]);

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees.set(employees);
      },
      error: (error) => {
        console.error('Failed to load employees', error);
      },
    });
  }

  addEmployee(employee: Employee) {
    this.empService.addEmployee(employee).subscribe({
      next: (createdEmployee) => {
        // Add newly created employee to UI
        this.employees.update((employees) => [...employees, createdEmployee]);
      },
      error: (error) => {
        console.error('Failed to add employee', error);
      },
    });
  }

  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe({
      next: () => {
        // Remove employee from UI
        this.employees.update((employees) => employees.filter((employee) => employee.id !== id));
      },
      error: (error) => {
        console.error('Failed to delete employee', error);
      },
    });
  }
}
