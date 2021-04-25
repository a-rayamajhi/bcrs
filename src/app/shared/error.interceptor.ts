/*
============================================
; Title: error.interceptor interface
; Author: Professor Krasso
; Date:   25 Apr 2021
; Modified by: Anil Rayamajhi
; Description: Error Interceptor
;===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(catchError(err => {

      // Intercept 400 errors
      if ([400, 405, 407, 410].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/404']);
      }

      // Intercept 500 errors
      if ([500].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/500']);
      }

      // Intercept all other errors
      const error = err.error.message || err.statusText;
      return throwError(error)
    }))
  }
}
