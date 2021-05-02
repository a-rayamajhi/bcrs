/*
============================================
; Title: PurchasesByServiceGraphComponent
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Erica Perry, Devan Wong
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css'],
})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    //Call the purchases graph API
    this.invoiceService.findPurchaseByServiceGraph().subscribe((res) => {
      //map the response data to the purchases variable
      this.purchases = res['data'];

      //loop over the purchases to split out the services and item count
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }
      // build the object literal for the primeNG bar graph
      this.data = {
        labels: this.labels, // label for services
        datasets: [
          //graph object
          {
            backgroundColor: [
              '#740001',
              '#AE0001',
              '#D3A625',
              '#EEBA30',
              '#000000',
              '#C0C0C0',
            ],
            hoverBackgroundColor: [
              '#450101',
              '#7d0001',
              '#9c7b1c',
              '#a88322',
              '#403f3f',
              '#9c9a9a',
            ],
            data: this.itemCount,
          },
        ],
      };

      // verify the data objects structures matches primeNG expected format
      console.log('Data Object');
      console.log(this.data);
    });
  }

  ngOnInit(): void {}
}
