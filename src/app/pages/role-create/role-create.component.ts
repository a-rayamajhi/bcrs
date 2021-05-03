/*
============================================
; Title:  Role Create
; Author: Professor Krasso
; Date:   30 Apr 2021
; Modified by: Anil Rayamajhi
; Description: role-create component page
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/shared/services/role.service';
import { IRole } from '../../shared/interfaces/role.interface';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  /**
   * CreateRole
   */
  create() {
    const newRole = {
      text: this.form.controls['text'].value,
    } as IRole;

    this.roleService.createRole(newRole).subscribe(
      (res) => {
        this.router.navigate(['/roles']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * navigate on Cancel
   */
  cancel() {
    this.router.navigate(['/roles']);
  }
}
