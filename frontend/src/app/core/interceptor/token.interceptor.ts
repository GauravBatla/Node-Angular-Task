import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ɵɵinject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn) => {
  const authToken = localStorage.getItem('token');
  
  const alertService = ɵɵinject(AlertService);
  const router = ɵɵinject(Router);


  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      alertService.info(error.error.message);
      if (error.status == 401) {
        localStorage.removeItem("token");
        router.navigate(["/login"]);
      }
      return throwError(()=>error);
    })
  );
};
