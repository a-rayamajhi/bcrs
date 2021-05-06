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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   *
   * @param message string
   * @param notificationType string
   *
   * launch snackbar method
   */
  openSnackBar(message: string, notificationType: string): void {
    this.snackBar.open(message, notificationType, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
