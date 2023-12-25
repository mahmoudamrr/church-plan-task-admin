import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalAuthService } from '../../services/auth/auth.service';
import { AuthService } from '../../pages/application/crud/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean | undefined;
  private authSubscription: Subscription | undefined;

  constructor(
    private localAuthService: LocalAuthService,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.localAuthService.isAuthenticated();

    this.authSubscription = this.localAuthService
      .isAuthenticated$()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  logout(): void {
    this.AuthService.logout().then((res) => {
      this.localAuthService.logout();
      this.router.navigate(['/login']);
    });
  }
}
