import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroModule} from "../../shared/ng-zorro/ng-zorro.module";
import {LoaderComponent} from "./loader.component";


@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    NgZorroModule
  ],
  exports: [LoaderComponent]
})
export class LoaderModule {

}
