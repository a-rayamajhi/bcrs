/*
============================================
; Title: Security Question Details Component TS
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
; Description: typescript component file focusing on the security questions details page
;===========================================
*/
// This was auto generated
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestionService } from '../../shared/services/security-question.service';
import { ISecurityQuestion } from '../../shared/interfaces/security-question.interface';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css'],
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: ISecurityQuestion;
  questionId: string;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private securityQuestionService: SecurityQuestionService
  ) {
    // grab question id from url params
    this.questionId = this.route.snapshot.paramMap.get('questionId');

    // find security question to pre fill security question edit
    this.securityQuestionService
      .findSecurityQuestionById(this.questionId)
      .subscribe(
        (res) => {
          this.question = res['data'];
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.form.controls.text.setValue(this.question.text);
        }
      );
  }

  ngOnInit(): void {
    // Creating Validators.
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  // Save question function
  saveQuestion() {
    const updatedSecurityQuestion = {} as ISecurityQuestion;
    updatedSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionService
      .updateSecurityQuestion(this.questionId, updatedSecurityQuestion)
      .subscribe((res) => {
        this.router.navigate(['/security-questions']);
      });
  }
  // Cancel Button
  cancel() {
    this.router.navigate(['/security-questions']);
  }
}
