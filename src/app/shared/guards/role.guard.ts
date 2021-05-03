/*
============================================
; Title: role.guard.ts
; Author: Professor Krasso
; Date:   29 Apr 2021
; Modified by: Devan Wong, Anil Rayamajhi
; Description:
;===========================================
*/

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  /**
   *
   * @param router Router
   * @param cookieService CookieService
   *
   * Router and cookie services Dependency injection
   */
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private roleService: RoleService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.roleService
      .findUserRole(this.cookieService.get('session-user'))
      .pipe(
        map((res) => {
          console.log(res);
          if (res['data'].role === 'admin') {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        })
      );
  }
}
