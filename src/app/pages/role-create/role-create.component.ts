/*
============================================
; Title:  Role Create
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by:
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
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService
    ) { }

  ngOnInit(): void {
  }
  /**
   * CreateRole - Erica
   */
}
