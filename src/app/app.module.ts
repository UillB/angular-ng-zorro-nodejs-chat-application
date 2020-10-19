import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {EventBusService} from "./core/services/event-bus.service";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, EventBusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
