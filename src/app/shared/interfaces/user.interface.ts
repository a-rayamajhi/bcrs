/*
============================================
; Title: securityQuestion interface
; Author: Professor Krasso
; Date:   16 Apr 2021
; Modified by: Devan Wong
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
  // Added dwong for user details page.
  role: string;
}
