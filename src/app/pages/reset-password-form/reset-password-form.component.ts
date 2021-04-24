/*
============================================
; Title: ResetPasswordFormComponent
; Author: Professor Krasso
; Date:   21 Apr 2021
; Modified by: Erica Perry
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'



@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  isAuthenticated: string;
  username: string;
  form: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cookieService: CookieService,
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshit.queryParamMap.get('username');

    ngOnInit(){
      this.form = this.fb.group({
        password: [null, Validators.compose([Validators.required])] // password required
      });
    }
resetPassword(){
  this.http.post('/api/session/users/' + this.username + '/reset-password',{
    password: this.Form.controls['password'].value
  }).subscribe(res => {

    /**
     * User is authenticated and we can grant them access
     */
    this.cookieService.set('sessoionuser', this.username, 1);
    this.router.navigate(['/']);
  }, err => {
    console.log(err);
  });
}




