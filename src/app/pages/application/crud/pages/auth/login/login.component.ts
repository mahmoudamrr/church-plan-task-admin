import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LocalAuthService } from '../../../../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isAuthenticated: boolean | undefined;
  private authSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private authLocalService: LocalAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authSubscription = this.authLocalService
      .isAuthenticated$()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onLoginClick(): void {
    this.markAllFormControlsAsTouched();
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService
        .login(email, password)
        .then((response: any) => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.authLocalService.login();
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.toastr.error(error.message);
          console.error('Login failed:', error);
        });
    }
  }

  private markAllFormControlsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      this.loginForm.get(controlName)?.markAsTouched();
    });
  }
}
