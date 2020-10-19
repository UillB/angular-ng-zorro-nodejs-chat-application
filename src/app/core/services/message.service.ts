import { Injectable } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private message: NzMessageService) { }

  /**
   * @description
   * Creates a global ng-zorro message to notify the user about some actions
   * @param messageType {string} - message type to display. Available types:
   * 1. success
   * 2. info
   * 3. warning
   * 4. error
   * @param messageContent {string} - message content which will be shown inside the widget
   */
  createMessage(messageType: string = 'success', messageContent: string): void {
    this.message.create(messageType, messageContent);
  }
}
