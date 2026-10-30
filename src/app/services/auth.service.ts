import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from './login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      username,
      password,
    });
  }
}
