import { ɵɵinject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const protectGuard: CanActivateFn = (route, state) => {
  const router = ɵɵinject(Router)
  const accessToken = localStorage.getItem('token');
  console.log(accessToken, 'accesstoken')
  if (accessToken != null) {
    console.log(accessToken, 'dashboard')
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
