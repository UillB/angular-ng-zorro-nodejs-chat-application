import {Component, OnDestroy, OnInit} from '@angular/core';
import {Chat} from "../../../core/models/chat";
import {ChatService} from "../../../core/services/chat.service";
import {MessageService} from "../../../core/services/message.service";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Observer, Subscription} from "rxjs";
import {EmitEvent, EventBusService, Events} from "../../../core/services/event-bus.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
/**
 * @class
 * Chat List component - wrapper for all the chats available in the application
 */
export class ChatListComponent implements OnInit, OnDestroy {
  // All the application chats
  chats: Chat[] = [];
  // Flag needed for show / hide the new Chat creating form
  chatCreationMode: boolean = false;
  // Form which is being used for creating the new chat
  validateChatCreationForm!: FormGroup;
  // Chat service subscription which is needed for fetching the Application chats every time
  // when new Chat has been created by the user
  applicationChatsSubscription: Subscription;

  constructor(
    private chatService: ChatService,
    private message: MessageService,
    private formBuilder: FormBuilder,
    private eventBus: EventBusService
  ) { }

  /**
   * 1. Subscribes to the Chat service RxJS subject in order to update the chat list component
   *    with all the Application Chats fetched from backend
   * 2. Fetch all the Application Chats from backend
   * 3. Defines the Chat creation form validators
   * 4. Subscribes to the Event Bus Service listener which triggers the new chat creation GET request
   *    whenever the user has created the new chat.
   */
  ngOnInit(): void {
    this.subscribeToTheApplicationChats()
    this.refreshApplicationChatList();
    this.validateChatCreationForm = this.formBuilder.group({
      newChatName: [null, [Validators.required], [this.chatNameAsyncValidator]]
    });
    this.subscribeToNewChatCreationEvent()
  }

  subscribeToTheApplicationChats() {
    this.applicationChatsSubscription = this.chatService.applicationChats$.subscribe(data => {
      this.chats = data;
    });
  }

  subscribeToNewChatCreationEvent() {
    this.eventBus.on(Events.newChatCreated, () => {
      this.refreshApplicationChatList();
    });
  }

  refreshApplicationChatList(){
    this.chatService.updatedApplicationChatList();
  }

  ngOnDestroy() {
    this.applicationChatsSubscription.unsubscribe();
  }

  cancelChatCreationMode(): void {
    this.chatCreationMode = false;
  }

  /**
   * 1. Removes all form related validators
   * 2. Send a POST request in order to create a new chat
   * 3. Emits a new event to the Event Bus Service in order to notify that
   *    new chat has been created.
   */
  onChatCreationSave(): void {
    for (const i in this.validateChatCreationForm.controls) {
      this.validateChatCreationForm.controls[i].markAsDirty();
      this.validateChatCreationForm.controls[i].updateValueAndValidity();
      this.validateChatCreationForm.controls[i].clearAsyncValidators();
    }
    this.createNewChatRoom();
    this.toggleChatCreationMode();
    this.eventBus.emit(new EmitEvent(Events.newChatCreated));
  }

  createNewChatRoom() {
    let newChatName = this.validateChatCreationForm.controls['newChatName'].value;
    this.chatService.createChatRoom(newChatName)
      .subscribe(() => this.message.createMessage(
        'success', `Successfully created the chat: ${newChatName}`
      ));
  }

  toggleChatCreationMode() {
    this.chatCreationMode = !this.chatCreationMode;
  }

  /**
   * RxJS based asynchronous validator which validated the entered
   * data immediately and does not allow User to send some bad data to the backend.
   * @param control {FormControl} - Reactive Form field which is being validated
   */
  chatNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.chatService.getChats()
        .subscribe(data => {
          if (data.some(chat => chat.name === control.value)) {
            observer.next({ error: true, chatExists: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        })
    });

}
