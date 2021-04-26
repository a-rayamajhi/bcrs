/*
============================================
; Title: base-layout component
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Anil Rayamajhi
; Description: base-layout component
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  username: string;
  /**
   *
   * @param router Router
   * @param cookieService CookieService
   */
  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.username = this.cookieService.get('session-user');
  }

  /**
   * logOut(): delete session_user cookie and redirect to login page
   */
  logOut() {
    this.cookieService.delete('session-user');
    this.router.navigate(['session/signin']);
  }

  /**
   * Check if the router url contains the specified route
   *
   * @param {string} route
   * @returns
   * @memberof MyComponent
   */
  isAboutRoute() {
    return this.router.url.includes('about');
  }
}
