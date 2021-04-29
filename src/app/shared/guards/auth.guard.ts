/*
============================================
; Title: auth.guard.ts
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Devan Wong, Anil Rayamaji
; Description: Logic to validate User from using cookie service.
;===========================================
*/

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   *
   * @param router Router
   * @param cookieService CookieService
   *
   * Router and cookie services Dependency injection
   */
  constructor(private router: Router, private cookieService: CookieService) {}

  /**
   *
   * @returns Boolean
   *
   * Description: navigate to sign in page
   * if session user cookie does not exist
   */
  canActivate() {
    const isAuthenticated = this.cookieService.get('session-user');

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}
