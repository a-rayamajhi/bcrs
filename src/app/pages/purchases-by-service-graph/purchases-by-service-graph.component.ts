/*
============================================
; Title: PurchasesByServiceGraphComponent
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by:
;===========================================
*/


import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchase: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    //Call the purchases graph API

    /**
     * findPurchaseByServiceGraph - Erica
     */
   }

  ngOnInit(): void {
  }

}
