/*
============================================
; Title: User-details components
; Author: Professor Krasso
; Date:  29 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
; Description: user details component.ts
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/shared/services/role.service';
import { IRole } from '../../shared/interfaces/role.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: IUser;
  userId: string;
  form: FormGroup;
  roles: IRole[];

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId');

    // FindUserById for pre fill edit view initial values
    this.userService.findUserById(this.userId).subscribe(
      (res) => {
        this.user = res['data'];
      },
      (err) => {
        console.log(err);
      },
      () => {
        // setting initial values
        this.form.controls.firstName.setValue(this.user.firstName);
        this.form.controls.lastName.setValue(this.user.lastName);
        this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
        this.form.controls.address.setValue(this.user.address);
        this.form.controls.email.setValue(this.user.email);
        this.form.controls.role.setValue(this.user.role['role']);
        /**
         * FindAllRoles
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
    );
  }

  ngOnInit(): void {
    // Adding Validators to the form
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      role: [null, Validators.compose([Validators.required])],
    });
  }

  // SaveUser function to updateUse
  saveUser() {
    const updatedUser = {} as IUser; //pulling from user.interface.
    updatedUser.firstName = this.form.controls.firstName.value;
    updatedUser.lastName = this.form.controls.lastName.value;
    updatedUser.phoneNumber = this.form.controls.phoneNumber.value;
    updatedUser.address = this.form.controls.address.value;
    updatedUser.email = this.form.controls.email.value;
    updatedUser.role = this.form.controls.role.value;
    console.log(updatedUser);
    // updateUser service method to make network call to update user
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      (res) => {
        this.router.navigate(['/users']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // This is the cancel button.
  cancel() {
    this.router.navigate(['/users']);
  }
}
