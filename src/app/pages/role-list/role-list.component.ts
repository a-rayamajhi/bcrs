/*
============================================
; Title:  Role List
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong
; Description: role-list component page
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from 'src/app/shared/services/role.service';
import { IRole } from '../../shared/interfaces/role.interface';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  roles: IRole[];
  displayedColumns = ['role', 'functions'];
  constructor(private dialog: MatDialog, private roleService: RoleService) {
    /**
     * findAllRoles
     */
    this.roleService.findAllRoles().subscribe(
      (res) => {
        this.roles = res['data'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}

  /**
   *
   * @param roleId string
   * @param text string
   *
   * Delete role
   */
  delete(roleId: string, text: string) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        roleId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete role: ${text}?`,
      },
      disableClose: true,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.roleService.deleteRole(roleId).subscribe((res) => {
          console.log('Role deleted');
          this.roles = this.roles.filter((role) => role._id !== roleId);
        });
      }
    });
  }
}
