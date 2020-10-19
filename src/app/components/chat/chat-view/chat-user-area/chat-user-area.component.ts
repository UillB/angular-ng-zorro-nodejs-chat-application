import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-chat-user-area',
  templateUrl: './chat-user-area.component.html',
  styleUrls: ['./chat-user-area.component.scss']
})
export class ChatUserAreaComponent {
  @Input() userMessage: string;
  @Output() userMessageSend: EventEmitter<any> = new EventEmitter<any>();
  @Output() userValueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  /**
   * This method is being invoked once
   * user types anything to the message input area
   * @param val (String) - input value at the moment
   * when this method is being triggered
   */
  onUserValueChange(val) {
    this.userValueChange.emit(val);
  }

  /**
   * 1.Emits an Angular EventEmitter trigger in order to notify the parent component
   *   that user has sent the new message to the chat
   * 2. Scroll to the bottom of the chat messages container after sending the new message.
   *    I was trying to make the scroll much more 'Angular' adoptable using the @View and DOM
   *    element references, but I did not get enough time to complete it, so created this 'ugly'
   *    workaround using the setTimeout.
   */
  onUserMessageSendButtonClick(): void {
    this.userMessageSend.emit(this.userMessage);
    setTimeout(() => {
      let elementScrollBottomTo = document.getElementsByClassName('chat-content')[0];
      elementScrollBottomTo.scrollTop = elementScrollBottomTo.scrollHeight;
    }, 100);
  }

}
