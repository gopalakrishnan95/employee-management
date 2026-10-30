import { inject, Injectable, signal } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private empApiUrl = 'http://localhost:8080/emp';

  getAllEmployees() {
    return this.http.get<Employee[]>(this.empApiUrl);
  }

  // POST
  addEmployee(employee: Employee) {
    return this.http.post<Employee>(this.empApiUrl, employee);
  }

  // DELETE
  deleteEmployee(id: number) {
    return this.http.delete<void>(`${this.empApiUrl}/${id}`);
  }
}
