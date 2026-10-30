import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected authService = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    if (this.loginForm.invalid) {
    }

    console.log(this.loginForm.value);

    const { username, password } = this.loginForm.getRawValue();

    this.authService.login(username!, password!).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.token);

        console.log('Login successful');
      },

      error: (error) => {
        console.log('Invalid credentials');
      },
    });
  }
}
