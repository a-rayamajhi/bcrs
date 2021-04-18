/*
============================================
; Title: App-routing file
; Author: Professor Krasso
; Date:   18 Apr 2021
; Modified by: Devan Wong, Anil rayamajhi
; Description: Routes page
;===========================================
*/

// Import Components
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
// Import angulars
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Guards
import { AuthGuard } from './shared/auth.guard';
import { SecurityQuestionService } from './shared/security-question.service';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent,
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent,
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent,
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
