/*
============================================
; Title:  Role Details
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong, Erica Perry
; Description: role-details component page
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/shared/services/role.service';
import { IRole } from 'src/app/shared/interfaces/role.interface';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
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
     * findRoleById
     */
    this.roleId = route.snapshot.paramMap.get('roleId');

    this.roleService.findRoleById(this.roleId).subscribe(
      (res) => {
        this.role = res['data'];
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.form.controls['text'].setValue(this.role.text);
      }
    );
  }

  // Form builder
  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  /**
   * Save function
   */
  save() {
    const updatedRole = {
      text: this.form.controls['text'].value,
    } as IRole;

    this.roleService.updateRole(this.roleId, updatedRole).subscribe(
      (res) => {
        this.router.navigate(['/roles']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Cancel function
   */
  cancel() {
    this.router.navigate(['/roles']);
  }
}
