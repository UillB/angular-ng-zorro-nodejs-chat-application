import {Injectable} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) {
  }

  /**
   * Creates global Ng-Zorro notification
   * @param type {string} - the type of notification. Available types:
   * 1. success
   * 2. error
   * 3. info
   * 4. warning
   * @param title {string} - notification title
   * @param content {string} - notification content
   */
  createNotification(type: string, title: string, content: string): void {
    this.notification.create(
      type,
      title,
      content,
      {
        nzDuration: 5000
      }
    );
  }
}
