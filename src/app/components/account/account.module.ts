import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {AccountLayoutComponent} from './account-layout.component';
import {AccountRoutingModule} from "./account-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [RegisterComponent, AccountLayoutComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule {
}
