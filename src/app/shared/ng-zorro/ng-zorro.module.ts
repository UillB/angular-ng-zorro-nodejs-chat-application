import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IconsProviderModule} from "../../icons-provider.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzModalModule,
    NzResultModule,
    NzCardModule,
    NzSpinModule,
    NzNotificationModule,
    NzMessageModule,
    NzAlertModule,
    NzTypographyModule,
    NzPageHeaderModule,
    NzToolTipModule,
    NzPopconfirmModule
  ],
  exports: [
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzModalModule,
    NzResultModule,
    NzCardModule,
    NzSpinModule,
    NzNotificationModule,
    NzMessageModule,
    NzAlertModule,
    NzTypographyModule,
    NzPageHeaderModule,
    NzToolTipModule,
    NzPopconfirmModule
  ]
})
export class NgZorroModule { }
