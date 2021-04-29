/*
============================================
; Title: invoice interface
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong
;===========================================
*/
// Import line-items
import { ILineItem } from './line-item.interface';

export interface IInvoice {
  userName: string;
  lineItems: ILineItem[];
  partsAmount: number;
  laborAmount: number;
  lineItemTotal: number;
  total: number;
  orderDate: Date;
}
