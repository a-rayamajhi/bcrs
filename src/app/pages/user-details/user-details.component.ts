/*
============================================
; Title: User-details components
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
; Description: user details component.ts
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/shared/user.interface';
import { UserService } from './../../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}
  user: IUser;
  userId: string;
  form: FormGroup;

  // findUserByID: Erica.

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

    this.userService.updateUser(this.userId, updatedUser).subscribe(
      (res) => {
        this.router.navigate(['/users']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // End saveUser
}
