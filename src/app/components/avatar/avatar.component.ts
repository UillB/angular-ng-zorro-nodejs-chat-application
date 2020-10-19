import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from "../../core/models/chat-message";
import {AccountService} from '../../core/services/account.service';
import {User} from '../../core/models/user';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
/**
 * @class
 * Reusable Application component which represents the User avatar.
 * Currently used in the Chat view (for chat message item), but might be used
 * in the User profile section as well (for example)
 */
export class AvatarComponent {
  @Input() message: ChatMessage;
  user: User
}
