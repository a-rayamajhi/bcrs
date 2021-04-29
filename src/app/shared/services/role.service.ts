/*
============================================
; Title: role service file
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong
; Description: role service file
;===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRole } from '../interfaces/role.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

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
   * findById() - ANIL
   */

   /**
   * createRole() - ERICA
   */

  /**
   *
   * @param roleId string
   * @param updateRole IRole
   * @returns Observable
   *
   * UpdateRole API
   */
  updateRole(roleId: string, role: IRole): Observable<any> {
    return this.http.put('/api/roles' + roleId, {
      text: role.text
    })
  }
   /**
   * deleteRole() - ANIL
   */

   /**
   * findUserRole() - ERICA
   */
}
