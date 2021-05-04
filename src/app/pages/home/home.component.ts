/*
============================================
; Title:  Home Component TS.
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong
; Description: Home component.ts page
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IServiceRepairItem } from 'src/app/shared/interfaces/service-repair-item.interface';
import { ILineItem } from 'src/app/shared/interfaces/line-item.interface';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceRepairService } from 'src/app/shared/services/service-repair.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { IInvoice } from 'src/app/shared/interfaces/invoice.interface';
import { InvoiceSummaryDialogComponent } from 'src/app/dialogs/invoice-summary-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  userName: string;
  services: IServiceRepairItem[];
  lineItems: ILineItem[];

  constructor(
    private cookieService: CookieService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private serviceRepairService: ServiceRepairService,
    private invoiceService: InvoiceService
  ) {
    // get a username
    this.userName = this.cookieService.get('session-user');
    this.services = this.serviceRepairService.getServiceRepairItems();
  }

  ngOnInit(): void {
    // Form Builder
    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])],
      alternator: [null, null],
    });
  }

  /**
   * Submit form
   */
  submit(form) {
    console.log(form);
    const selectedServiceIds = [];
    for (const [key, value] of Object.entries(form.checkGroup)) {
      if (value) {
        selectedServiceIds.push({
          id: key,
        });
      }
    }

    this.lineItems = [];

    // Invoice Object
    for (const savedService of this.services) {
      for (const selectedService of selectedServiceIds) {
        if (savedService.id === selectedService.id) {
          this.lineItems.push({
            title: savedService.title,
            price: savedService.price,
          });
        }
      }
    }

    console.log(this.lineItems);

    const partsAmount = form.parts ? parseFloat(form.parts) : 0;
    const laborAmount = form.labor ? parseFloat(form.labor) * 50 : 0;
    const lineItemTotal = this.lineItems.reduce(
      (prev, cur) => prev + cur.price,
      0
    );
    const total = partsAmount + laborAmount + lineItemTotal;

    const invoice = {
      userName: this.userName,
      lineItems: this.lineItems,
      partsAmount,
      laborAmount,
      lineItemTotal,
      total,
      orderDate: new Date(),
    } as IInvoice;

    console.log(invoice);

    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice,
      },
      disableClose: true,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        console.log('Invoice saved');

        this.invoiceService.createInvoice(invoice.userName, invoice).subscribe(
          (res) => {
            this.router.navigate(['/']);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}
