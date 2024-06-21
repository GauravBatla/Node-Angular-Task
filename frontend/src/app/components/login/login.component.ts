import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,CommonModule,HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  invalid: any = true;
  submitted = false;
  email: any;
  password: any;
  loginForm!: FormGroup;
  passwordVisible: boolean = false;
  constructor(private _login: LoginService, private _route: Router, private formBuilder: FormBuilder,
    private alertService: AlertService
    
    ) { }

  ngOnInit() {
    this.buildForm();
  }
  

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  get f() {
    return this.loginForm.controls;
  }
  
  login() {
    this.submitted = true;
    if (this.loginForm?.invalid) {
      return;
    }
    let login = {
      email: this.loginForm?.value.email,
      password: this.loginForm?.value.password
    }
    this._login.login(login).subscribe(
      result => {
        console.log(result,"result");

        if (result.status == 200) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', result.data.token);
          this.alertService.success(`Login successfully`)
            this._route.navigate(['/dashboard']);
        } else this.invalid = false;
      },
      err => {
        if (err) {
          console.log(err);
        }
        this.invalid = false;
      }
    );

  }
}
