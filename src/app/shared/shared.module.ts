import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroModule} from "./ng-zorro/ng-zorro.module";
import { FirstLetterCapitalizeMemoPipe } from './pipes/first-letter-capitalize-memo.pipe';



@NgModule({
  declarations: [FirstLetterCapitalizeMemoPipe],
  imports: [
    CommonModule,
    NgZorroModule
  ],
  exports: [
    NgZorroModule,
    FirstLetterCapitalizeMemoPipe
  ]
})
export class SharedModule { }
