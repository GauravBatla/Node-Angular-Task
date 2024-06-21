import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
   }
   
  loggedIn() {
    console.log(!!localStorage.getItem('token'));
    
    return !!localStorage.getItem('token');
  }
}
