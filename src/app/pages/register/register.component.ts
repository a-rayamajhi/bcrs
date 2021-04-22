/*
============================================
; Title: RegisterComponent
; Author: Professor Krasso
; Date:   21 Apr 2021
; Modified by: Devan Wong
;===========================================
*/

// This was autogenerated
import { Component, OnInit } from '@angular/core';
// Imported for the constructor
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
// Imported to use security-question interface.
import { ISecurityQuestion } from '../../shared/security-question.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  securityQuestion: ISecurityQuestion[];
  form: FormBuilder;
  registrationForm: FormGroup;
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) { }

  // Form Registration from HTML page.
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      contactInformation: new FormGroup({
        firstName: new FormGroup(null, Validators.required),
        lastName: new FormGroup(null, Validators.required),
        phoneNumber: new FormGroup(null, Validators.required),
        address: new FormGroup(null, Validators.required),
        email: new FormGroup(null, Validators.required)
      }),
      securityQuestion: new FormGroup({
        securityQuestion1: new FormGroup(null, Validators.required),
        securityQuestion2: new FormGroup(null, Validators.required),
        securityQuestion3: new FormGroup(null, Validators.required),
        answerToSecurityQuestion1: new FormGroup(null, Validators.required),
        answerToSecurityQuestion2: new FormGroup(null, Validators.required),
        answerToSecurityQuestion3: new FormGroup(null, Validators.required)
      }),
      credentials: new FormGroup({
        userName: new FormGroup(null, Validators.required),
        password: new FormGroup(null, Validators.required)
      })
    });
  }

  // Register Form
  register(form){
    const contactInformation = form.contactInformation;
    const securityQuestions = form.securityQuestions;
    const credentials = form.credentials;

    const selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.answerToSecurityQuestion1
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.answerToSecurityQuestion2
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.answerToSecurityQuestion3
      }
    ];
     console.log(securityQuestions);

     this.http.post('/api/session/register', {
       userName: credentials.userName,
       password: credentials.password,
       firstName: contactInformation.firstName,
       lastName: contactInformation.lastName,
       phoneNumber: contactInformation.phoneNumber,
       address: contactInformation.address,
       email: contactInformation.email,
       selectedSecurityQuestions: selectedSecurityQuestions
     }).subscribe(res => {
       if (res['data'])
       {
         /**
          * User is authenticated and we can grant them access
          */
         this.cookieService.set('sessionuser', credentials.userName, 1);
         this.router.navigate(['/']);
       }
       else
       {
         /**
          * User is not authenicated and we should return the error message
          */
         this.errorMessage = res['message'];
       }
      },
        err =>
        {
          console.log(err);
          this.errorMessage = err;
        })
      }
    }