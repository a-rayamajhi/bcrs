/*
============================================
; Title: role service file
; Author: Professor Krasso
; Date:   30 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
; Description: role service file
;===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRole } from '../interfaces/role.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns Observable
   *
   * findAllRoles API
   */
  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }

  /**
   * @param roleId string
   * @returns Observable
   *
   * findById API
   */
  findRoleById(roleId: string): Observable<any> {
    return this.http.get('/api/roles/' + roleId);
  }

  /**
   * @param roleId string
   * @returns Observable
   *
   * createRole API
   */
  createRole(role: IRole): Observable<any> {
    return this.http.post('/api/roles', {
      text: role.text,
    });
  }

  /**
   *
   * @param roleId string
   * @param updateRole IRole
   * @returns Observable
   *
   * UpdateRole API
   */
  updateRole(roleId: string, role: IRole): Observable<any> {
    return this.http.put('/api/roles/' + roleId, {
      text: role.text,
    });
  }
  /**
   * @param roleId string
   * @returns Observable
   *
   * deleteRole API
   */
  deleteRole(roleId: string): Observable<any> {
    return this.http.delete('/api/roles/' + roleId);
  }

  /**
   * @param userName string
   *
   * findUserRole API
   */
  findUserRole(userName: string): Observable<any> {
    return this.http.get('/api/users/' + userName + '/roles');
  }
}
