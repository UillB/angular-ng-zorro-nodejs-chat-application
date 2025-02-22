import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountLayoutComponent} from "./account-layout.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {
    path: '', component: AccountLayoutComponent,
    children: [
      {path: 'register', component: RegisterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
