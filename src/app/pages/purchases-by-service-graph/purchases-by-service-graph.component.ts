/*
============================================
; Title: PurchasesByServiceGraphComponent
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Erica Perry
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
  purchase: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    //Call the purchases graph API

    this.invoiceService.findPurchasesByServiceGraph().subscribe((res) => {
      //map the response data to the purchaces varible
      this.purchase = res['data'];

      //loop over the purchases to split out the services and item count
      for (const item of this.purchase) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }
      // build the object literal for the primeNG bar graph
      this.data = {
        labels: this.labels, // label for services
        database: [
          //graph object
          {
            backgroundColor: [
              '#ED0A3F',
              '#ED0A3F',
              '#ED0A3F',
              '#ED0A3F',
              '#ED0A3F',
              '#ED0A3F',
            ],
            hoverBackgroundColor: [
              '#ED0A3F',
              '#ED0A3F',
              '#ED0A3F',
              '#ED0A3F',
              '#ED0A3F',
              '#ED0A3F',
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
