import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../../core/models/chat";
import {ChatService} from "../../../../core/services/chat.service";
import {AccountService} from "../../../../core/services/account.service";
import {User} from "../../../../core/models/user";
import {EmitEvent, EventBusService, Events} from "../../../../core/services/event-bus.service";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss']
})
/**
 * @class
 * Chat-list item component - represents single chat in the list of all Application available chats
 */
export class ChatListItemComponent implements OnInit {
  @Input() chats: Chat[];
  currentUser: User;

  constructor(
    private chatService: ChatService,
    private accountService: AccountService,
    private eventBus: EventBusService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.accountService.user;
  }

  /**
   * Send the POST request to the backend in order to notify all other users in the chat
   * that new user has joined.
   * @param chatId {number} - current chat number
   */
  onUserChatJoin(chatId: number): void {
    this.chatService.joinChat(chatId, this.currentUser.id)
      .subscribe(() => console.log(`Successfully joined to the chat with ID ${chatId}. User ID: ${this.currentUser.id}`));
    this.eventBus.emit(new EmitEvent(Events.newUserJoined));
  }

}
