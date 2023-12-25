import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalAuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());

  // Expose the subject as an observable for external components to subscribe
  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Method to perform login
  login(): void {
    // Your authentication logic here
    // After successful authentication, update the status
    this.isAuthenticatedSubject.next(true);
  }

  // Method to perform logout
  logout(): void {
    // Your logout logic here
    // After logout, update the status
    localStorage.removeItem("token")
    this.isAuthenticatedSubject.next(false);
  }
}
