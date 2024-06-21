import { CanActivateFn, Router } from '@angular/router';
import { ɵɵinject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = ɵɵinject(AuthService);
  const router = ɵɵinject(Router);

  // Check if the user is logged in using the AuthService
  const token = localStorage.getItem('token');
  if (authService.loggedIn()) {
    return true; // If logged in, allow access to the route
  }
  router.navigate(['/login']);
  return false;

};
