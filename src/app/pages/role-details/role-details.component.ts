/*
============================================
; Title:  Role Details
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong
; Description: role-details component page
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleService } from 'src/app/shared/services/role.service';
import { IRole } from 'src/app/shared/interfaces/role.interface';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  form: FormGroup;
  role: IRole;
  roleId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService
  ) {
  /**
   * findRoleById - Anil
   */

   }

  ngOnInit(): void {
    // Form builder
  }

  /**
   * Save function
   */
  save() {
    const updatedRole = {
      text: this.form.controls['text'].value
    } as IRole;

    this.roleService.updateRole(this.roleId, updatedRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      console.log(err);
    })
  }

  /**
   * Cancel function - DEVAN
   */
  cancel() {
    this.router.navigate(['/roles']);
  }
}
