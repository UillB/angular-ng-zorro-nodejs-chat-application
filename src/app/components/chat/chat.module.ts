import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatLayoutComponent} from './chat-layout.component';
import {ChatListComponent} from './chat-list/chat-list.component';
import {NgZorroModule} from "../../shared/ng-zorro/ng-zorro.module";
import {ChatListItemComponent} from './chat-list/chat-list-item/chat-list-item.component';
import {ChatViewLayoutComponent} from './chat-view/chat-view-layout.component';
import {LoaderModule} from "../../core/loader/loader.module";
import { ChatMessageItemComponent } from './chat-view/chat-message-item/chat-message-item.component';
import { ChatUserAreaComponent } from './chat-view/chat-user-area/chat-user-area.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AvatarComponent} from "../avatar/avatar.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ChatLayoutComponent,
    ChatListComponent,
    ChatListItemComponent,
    ChatListItemComponent,
    ChatViewLayoutComponent,
    ChatMessageItemComponent,
    ChatUserAreaComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NgZorroModule,
    LoaderModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ChatModule {
}
