import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/boards']);
    }

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.isSuccess) {
          localStorage.setItem('token', response.result.token);
          localStorage.setItem('user', JSON.stringify(response.result.user));
          Swal.fire('Login', 'Login successful!', 'success');
          this.router.navigate(['/boards']);
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire('Error', 'An error occurred during login', 'error');
      }
    );
  }


  goToRegister() {

    this.router.navigate(['/auth/register']);
  }


  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }




}
