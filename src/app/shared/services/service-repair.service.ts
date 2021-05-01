/*
============================================
; Title: service-repair server file
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Erica Perry, Anil Rayamajhi
; Description: service-repair page
;===========================================
*/

// import statements needed
import { Injectable } from '@angular/core';
import { IServiceRepairItem } from '../interfaces/service-repair-item.interface';

@Injectable({
  providedIn: 'root',
})
// Class created
export class ServiceRepairService {
  serviceRepairItems: IServiceRepairItem[];
  // items with their id, title and price to be generated
  constructor() {
    this.serviceRepairItems = [
      {
        id: '101',
        title: 'Password Reset',
        price: 39.99,
      },
      {
        id: '102',
        title: 'Spyware Removal',
        price: 99.99,
      },
      {
        id: '103',
        title: 'RAM Upgrade',
        price: 129.99,
      },
      {
        id: '104',
        title: 'Software Installation',
        price: 49.99,
      },
      {
        id: '105',
        title: 'PC Tune-up',
        price: 89.99,
      },
      {
        id: '106',
        title: 'Keyboard Cleaning',
        price: 45.0,
      },
      {
        id: '107',
        title: 'Disk Clean-up',
        price: 149.99,
      },
    ];
  }
  getServiceRepairItems(): IServiceRepairItem[] {
    return this.serviceRepairItems;
  }
}
