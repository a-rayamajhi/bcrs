/*
============================================
; Title: delete-record-dialog component
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Devan Wong
; Description: delete-record-dialog component
;===========================================
*/

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-record-dialog',
  templateUrl: './delete-record-dialog.component.html',
  styleUrls: ['./delete-record-dialog.component.css'],
})
export class DeleteRecordDialogComponent implements OnInit {
  recordId: string;
  dialogHeader: string;
  dialogBody: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteRecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.recordId = data.recordId;
    this.dialogHeader = data.dialogHeader;
    this.dialogBody = data.dialogBody;
  }

  ngOnInit(): void {}

}
