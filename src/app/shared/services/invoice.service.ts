/*
============================================
; Title: invoice service file
; Author: Professor Krasso
; Date:   30 Apr 2021
; Modified by: Anil Rayamajhi
; Description: invoice service file
;===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInvoice } from '../interfaces/invoice.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  findPurchasesByServiceGraph: any;

  constructor(private http: HttpClient) {}

  /**
   * createInvoice()
   */
  createInvoice(userName: string, invoice: IInvoice): Observable<any> {
    return this.http.post(`/api/invoices/${userName}`, {
      userName,
      lineItems: invoice.lineItems,
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.laborAmount,
      lineItemTotal: invoice.lineItemTotal,
      total: invoice.total,
    });
  }

  /**
   * findPurchaseByServiceGraph()
   */
  findPurchaseByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
  }
}
