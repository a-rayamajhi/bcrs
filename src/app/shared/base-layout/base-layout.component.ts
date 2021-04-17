/*
============================================
; Title: base-layout component
; Author: Professor Krasso
; Date:   16 Apr 2021
; Modified by: Devan Wong
; Description: base-layout component
;===========================================
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
