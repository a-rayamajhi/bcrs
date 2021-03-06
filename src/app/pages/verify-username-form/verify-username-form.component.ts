/*
============================================
; Title: verify-username-form.component.ts
; Author: Professor Krasso
; Date:   21 Apr 2021
; Modified by: Erica Perry
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snackBar.service';

@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css'],
})
export class VerifyUsernameFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
    });
  }
  validateUsername() {
    const username = this.form.controls['username'].value;
    console.log(username);
    this.http.get('/api/session/verify/users/' + username).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['/session/verify-security-questions'], {
            queryParams: { username: username },
            skipLocationChange: true,
          });
        }
      },
      (err) => {
        this.snackBarService.openSnackBar(err, 'ERROR');
        console.log(err);
      }
    );
  }
}
