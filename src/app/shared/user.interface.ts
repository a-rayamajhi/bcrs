/*
============================================
; Title: user Interface file
; Author: Professor Krasso
; Date:   16 Apr 2021
; Modified by: Devan Wong
; Description: User.interface.ts file
;===========================================
*/
// Creating variables to import into the db.
export interface IUser {
  _id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
}
