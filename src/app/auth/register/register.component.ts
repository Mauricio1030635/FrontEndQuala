import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Admin', Validators.required]
    });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const registerData = this.registerForm.value;
    this.authService.register(registerData).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.isSuccess) {
          Swal.fire('Register', 'Registration successful! Please login.', 'success');
          this.router.navigate(['/auth/login']);
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire('Error', 'An error occurred during registration', 'error');
      }
    );
  }

  get email() {
    return this.registerForm.get('email');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get role() {
    return this.registerForm.get('role');
  }
}
