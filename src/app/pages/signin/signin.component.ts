/*
============================================
; Title: Signin.ts
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Anil Rayamajhi
; Description: Authentication logic with Sign in
; form builder and validation
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Form Build and validation
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  /**
   * Sign In logic, http POST
   */
  signIn() {
    const userName = this.form.controls.userName.value;
    const password = this.form.controls.password.value;

    // network call to authenticate user based on username and password
    this.http
      .post('/api/session/signin', {
        userName,
        password,
      })
      .subscribe(
        (res) => {
          if (res['data'].userName) {
            // authenticated, set cookie and navigate to dashboard
            this.cookieService.set('session-user', res['data'].userName, 1);
            this.cookieService.set('user-role', res['data']['role']['role'], 1);
            this.router.navigate(['/']);
          }
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error.message;
        }
      );
  }
}
