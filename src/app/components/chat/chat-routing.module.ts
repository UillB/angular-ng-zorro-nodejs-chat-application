import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatLayoutComponent} from "./chat-layout.component";
import {ChatViewLayoutComponent} from "./chat-view/chat-view-layout.component";

const routes: Routes = [
  {path: '', component: ChatLayoutComponent},
  {path: 'chatroom/:id', component: ChatViewLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
