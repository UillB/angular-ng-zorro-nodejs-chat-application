import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ChatService} from "../../../core/services/chat.service";
import {ChatRoom} from "../../../core/models/chat-room";
import {User} from "../../../core/models/user";
import {AccountService} from "../../../core/services/account.service";
import {MessageService} from "../../../core/services/message.service";
import {ChatMessage} from "../../../core/models/chat-message";
import {Subscription} from "rxjs";
import {EmitEvent, EventBusService, Events} from "../../../core/services/event-bus.service";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view-layout.component.html',
  styleUrls: ['./chat-view-layout.component.scss']
})
/**
 * @class
 * The overall Chat view layout class. Wrapper for all the chat-related
 * components such as 'chat-message' and 'user-area' (place where users types the message)
 */
export class ChatViewLayoutComponent implements OnInit, OnDestroy {

  // Current chat room
  chatRoom: ChatRoom;
  // Current chat room users
  chatUsers: User[] = [];
  // The value of the input where user types the message
  userMessage: string = null;
  // Current chat related messages
  chatMessages: ChatMessage[] = [];
  // Listener which is needed for determining and updating
  // the page whenever hew User has joined the chat
  chatRelatedUsersSubscription: Subscription;
  // Interval which will send the HTTP request for all the Chat related users
  // in order to update the view whenever the new User has joined
  refreshUsersInTheChatInterval: any;
  // Current Application user
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    public accountService: AccountService,
    private message: MessageService,
    private eventBus: EventBusService
  ) {
  }

  /**
   * 1. Fetches the current Chat from the backend
   * 2. Fetches all the users related to this chat
   * 3. Subscribes to the Chat Service Subject which is responsible for
   *    updating the chat Users whenever new user has joined the chat
   * 4. Subscribes to the Event Bus Service listener which triggers the chat related users GET request
   *    whenever the new user has joined the chat. 'emit' event for this listener is defined in the 'chat-list'
   *    component which is located in completely different scope
   * 5. Polling the Chat related users every 5 seconds in order to keep the UI view updated whenever the new User
   *    has joined this particular chat room.
   */
  ngOnInit(): void {
    this.getChat();
    this.refreshChatUsers();
    this.subscribeToTheChatRelatedUsersUpdates();
    this.subscribeToNewUserJoinedEvent();
    this.startPollingChatRelatedUsers();
    this.currentUser = this.accountService.user;
  }

  /**
   * 1. Remove the User from the chat space whenever he changes the Application route
   * 2. Unsubscribes to the chat related users updates
   * 3. Stops the polling of the chat related users
   */
  ngOnDestroy() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.chatService.removeUserFromChat(id, this.currentUser.id)
      .subscribe(() => {
        this.message.createMessage('info', `You have been automatically deleted from the chat ${this.chatRoom.name}`)
      });
    this.chatRelatedUsersSubscription.unsubscribe();
    this.stopPollingChatRelatedUsers();
  }

  subscribeToTheChatRelatedUsersUpdates() {
    this.chatRelatedUsersSubscription = this.chatService.chatRelatedUsers$.subscribe(data => {
      this.chatUsers = data;
    });
  }

  subscribeToNewUserJoinedEvent() {
    this.eventBus.on(Events.newUserJoined, () => {
      const chatId = +this.route.snapshot.paramMap.get('id');
      this.chatService.updateChatRelatedUsers(chatId);
    });
  }

  startPollingChatRelatedUsers() {
    this.refreshUsersInTheChatInterval = setInterval(() => {
      this.refreshChatUsers();
    }, 5000);
  }

  stopPollingChatRelatedUsers() {
    clearInterval(this.refreshUsersInTheChatInterval);
  }

  refreshChatUsers(): void {
    const chatId = +this.route.snapshot.paramMap.get('id');
    this.chatService.updateChatRelatedUsers(chatId);
  }

  getChat(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.chatService.getChatRoom(id)
      .subscribe(chatRoom => this.chatRoom = chatRoom);
  }

  onUserMessageSendButtonClicked(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (!this.userMessage) {
      return;
    }
    this.chatService.sendMessageToTheChat(id, {
      text: this.userMessage,
      userId: this.accountService.user.id
    })
      .subscribe(data => console.log(data));
    this.eventBus.emit(new EmitEvent(Events.chatMessageSent));
    this.userMessage = null;
  }

  onUserValueChanged(val) {
    this.userMessage = val;
  }

  onLeaveChatButtonClick() {
    this.router.navigate(['/chat'])
  }

}
