/*
============================================
; Title: user service TS file
; Author: Professor Krasso
; Date:   17 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
; Description: User.service.ts file
;===========================================
*/

import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   *
   * @param http HTTPClient DI
   */
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns Observable
   *
   * findAllUser API
   */
  findAllUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  /**
   *
   * @param userId string
   * @returns Observable
   *
   * findUserById API
   */
  findUserById(userId: string): Observable<any> {
    return this.http.get(`/api/users/${userId}`);
  }

  /**
   *
   * @param user IUser
   * @returns Observable
   *
   * createUser API
   */
  createUser(user: IUser): Observable<any> {
    return this.http.post('/api/users/', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
    });
  }

  /**
   *
   * @param userId string
   * @param user IUser
   * @returns Observable
   *
   * updateUser API
   */
  updateUser(userId: string, user: IUser): Observable<any> {
    return this.http.put('/api/users/' + userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
    });
  }

  /**
   *
   * @param userId string
   * @returns Observable
   *
   * deleteUser API
   */
  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/users/' + userId);
  }
}
