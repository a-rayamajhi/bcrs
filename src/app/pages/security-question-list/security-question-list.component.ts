/*
============================================
; Title: Security Question List Component TS
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
; Description: typescript component file focusing on the security question list page
;===========================================
*/

import { Component, OnInit } from '@angular/core';
// Imported the values for the security question
import { ISecurityQuestion } from '../../shared/security-question.interface';
import { SecurityQuestionService } from '../../shared/security-question.service';
// Imported for constructor
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css'],
})
export class SecurityQuestionListComponent implements OnInit {
  securityQuestions: ISecurityQuestion[];
  displayedColumns = ['question', 'functions'];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private securityQuestionService: SecurityQuestionService
  ) {
    // Subscribing to the findAllSecurityQuestion
    this.securityQuestionService.findAllSecurityQuestions().subscribe(
      res => {
        this.securityQuestions = res['data'];
        console.log(this.securityQuestions);
      },
      err => {
        console.log(err);
      })
    }

  ngOnInit(): void {}

  /**
   *
   * @param recordId string
   *
   * Delete function
   */
  delete(recordId: string) {
    // Delete Security question confirmation modal
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete security question ${recordId} ?`,
      },
      disableClose: true,
      width: '800px',
    });

    // Pop up dialog to delete a user.
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.securityQuestionService
          .deleteSecurityQuestion(recordId)
          .subscribe(res => {
            console.log('Security Question deleted');
            this.securityQuestions = this.securityQuestions.filter(
              q => q._id !== recordId
            );
          });
      }
    });
  }
}
