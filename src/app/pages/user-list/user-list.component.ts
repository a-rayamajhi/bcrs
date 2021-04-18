/*
============================================
; Title: User-list components
; Author: Erica Perry
; Date:   17 Apr 2021
; Modified by: Erica Perry, Devan Wong
; Description: user list component.ts
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from './../../shared/user.service';
import { IUser } from './../../shared/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: IUser[];
  displayedColumns = [
    'userName',
    'firstName',
    'phoneNumber',
    'address',
    'email',
    'functions',
  ];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.userService.findAllUsers().subscribe(
      (res) => {
        this.users = res['data'];
        console.log(this.users);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}

  /**
   *
   * @param userId
   * @param recordId
   *
   * Delete function
   */
  delete(userId, recordId) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete user ${recordId} ?`,
      },
      disableClose: true,
      width: '800px',
    });
    // Pop up dialog to delete a user.
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.userService.deleteUser(userId).subscribe((res) => {
          console.log(`User delete`);
          this.users = this.users.filter((u) => u._id !== userId);
        });
      }
    });
  }
}
