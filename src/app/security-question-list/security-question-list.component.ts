/*
============================================
; Title: Security Question List Component TS
; Author: Professor Krasso
; Date:   16 Apr 2021
; Modified by: Devan Wong
; Description: typescript component file focusing on the security question list page
;===========================================
*/
// This was auto generated
import { Component, OnInit } from '@angular/core';
// Imported the values for the security question
import { SecurityQuestion } from '../security-question.interface';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestionService } from '../security-question.service';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})

export class SecurityQuestionListComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  displayedColumns = ['question', 'functions'];

  constructor(private http: HttpClient, private dialog: MatDialog, private securityQuestionService: SecurityQuestionService) {
    // Subscribing to the findAllSecurityQuestion
    this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data'];
    },  err => {
      console.log(err);
    })
   }

  ngOnInit(): void {
  }

  // DeleteSecurity API: Erica

  // Mat Dialog function for pop up feature: Erica
}
