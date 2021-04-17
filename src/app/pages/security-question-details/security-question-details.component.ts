/*
============================================
; Title: Security Question Details Component TS
; Author: Professor Krasso
; Date:   16 Apr 2021
; Modified by: Devan Wong
; Description: typescript component file focusing on the security questions details page
;===========================================
*/
// This was auto generated
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { SecurityQuestionService } from '../../security-question.service';
import { SecurityQuestion } from '../../security-question.interface';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {
    this.questionId = this.route.snapshot.paramMap.get('questionId');

    // FindSecurityQuestionById: Erica


  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  // Save question function: Devan
  saveQuestion() {
    const updatedSecurityQuestion = {} as SecurityQuestion;
    updatedSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionService.updateSecurityQuestion(this.questionId, updatedSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions'])
    })
  }
  // Cancel Button
  cancel() {
    this.router.navigate(['/security-questions']);
  }
}
