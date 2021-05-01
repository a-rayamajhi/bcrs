/*
============================================
; Title:  Invoice Summary Dialog
; Author: Professor Krasso
; Date:   30 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
; Description: Invoice Summary Dialog component page
;===========================================
*/

import { Component, OnInit, Inject } from '@angular/core';
import { IInvoice } from '../shared/interfaces/invoice.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css'],
})
export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: IInvoice;

  constructor(
    private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.invoice = data.invoice;
  }

  ngOnInit(): void {}
}
