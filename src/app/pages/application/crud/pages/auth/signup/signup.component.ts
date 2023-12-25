import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onRegisterClick(): void {
    this.markAllFormControlsAsTouched();
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService
        .register(username, email, password)
        .then((response: any) => {
          this.toastr.success(
            'your account created successfully please login in'
          );
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          this.toastr.error(
            error.response.data.errors.map(
              (err: { message: any }) => err.message
            )
          );
        });
    }
  }

  private markAllFormControlsAsTouched(): void {
    Object.keys(this.registerForm.controls).forEach((controlName) => {
      this.registerForm.get(controlName)?.markAsTouched();
    });
  }
}
