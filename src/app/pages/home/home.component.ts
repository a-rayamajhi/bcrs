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
import { FormGroup, FormBuilder } from '@angular/forms';
import { IServiceRepairItem } from 'src/app/shared/interfaces/service-repair-item.interface';
import { ILineItem } from 'src/app/shared/interfaces/line-item.interface';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceRepairService } from 'src/app/shared/services/service-repair.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
   }


  ngOnInit(): void {
    // Form Builder
  }

  /**
   * Submit form - ANIL.
   */
}
