import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChatMessage} from "../../../../core/models/chat-message";
import {ChatService} from "../../../../core/services/chat.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AccountService} from "../../../../core/services/account.service";
import {EventBusService, Events} from "../../../../core/services/event-bus.service";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-chat-message-item',
  templateUrl: './chat-message-item.component.html',
  styleUrls: ['./chat-message-item.component.scss']
})
/**
 * @class
 * Class which is responsible for chat-message-item (one single message in the chat container)
 */
export class ChatMessageItemComponent implements OnInit, OnDestroy {

  // All the messages related to the chat
  chatMessages: ChatMessage[] = [];
  // Interval which is being used for polling the chat messages
  refreshChatMessagesInterval: any;
  // Subscription which is being used in order to notify the chat related service
  // that new chat message has been sent.
  chatRelatedMessagesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    public accountService: AccountService,
    private eventBus: EventBusService,
    private userService: UserService
  ) {
  }

  /**
   * 1. Subscribes to the Chat Service RxJS Subject in order to update the chat
   *    with all the messages fetched from backend.
   * 2. Converts the backend response data into the data which is needed for UI proper
   *    displaying (backend 'chat' Object has no userName, only ID and message text), however, it
   *    would be nice if user will see the names of another users, not just an IDs
   * 3. Fetches all the messages related to the chat from backend
   * 4. Subscribes to the Event Bus Service listener which triggers the chat related messages GET request
   *    whenever the user has sent the new message to the chat.
   * 5. Polling chat related messages from the backend every second - I would say this is the worst thing in this
   *    project, I completely understand that real-world application will not work in this way, as far as this approach
   *    makes a big pressure to the server. Responding to one chat every single second is one thing, but what if open
   *    a few (5-10) chats in a row? Even though I understand that I have done bad thing, I did not get enough time
   *    to think on how to do it in a better way without using Socket.io based backend server. Kindly request to not
   *    judge strictly :)
   */
  ngOnInit(): void {
    this.subscribeToTheChatRelatedMessages()
    this.refreshChatMessages();
    this.subscribeToNewMessageReceivedEvent();
    this.startPollingChatRelatedMessages();
  }

  /**
   * 1. Stops polling chat related messages
   * 2. Unsubscribe from the new chat related message updates
   */
  ngOnDestroy() {
    this.stopPollingChatRelatedMessages();
    this.chatRelatedMessagesSubscription.unsubscribe();
  }

  subscribeToTheChatRelatedMessages() {
    this.chatRelatedMessagesSubscription = this.chatService.chatRelatedMessages$.subscribe(data => {
      this.userService.getUsers().subscribe(users => {
        data.text.forEach(user => {
          users.forEach(chatUser => {
            if (chatUser.id === user.userId) {
              user['userName'] = chatUser.name
            }
          })
        })
        this.chatMessages = data.text;
      })
    });
  }

  subscribeToNewMessageReceivedEvent() {
    this.eventBus.on(Events.chatMessageSent, () => {
      this.refreshChatMessages();
    });
  }

  refreshChatMessages(): void {
    const chatId = +this.route.snapshot.paramMap.get('id');
    this.chatService.updateChatRelatedMessages(chatId);
  }

  startPollingChatRelatedMessages() {
    this.refreshChatMessagesInterval = setInterval(() => {
      this.refreshChatMessages();
    }, 1000);
  }

  stopPollingChatRelatedMessages() {
    clearInterval(this.refreshChatMessagesInterval);
  }


}
