import { Component } from '@angular/core';
import {AccountService} from "./core/services/account.service";
import {User} from "./core/models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /** Toggle property responsible for showing / hiding the App main sidebar */
  isCollapsed = false;

  /**
   * User property which is responsible for determining which Application
   * modules can be shown if user is logged in and which should be hidden.
   */
  user: User;

  /**
   * @constructor
   * @param accountService {AccountService} - service which is responsible for determination
   * of whether Application has logged in user or not (based on localStorage key)
   */
  constructor(
    private accountService: AccountService
  ) {
    // Subscribe and listen whether user is logged in or not.
    // If so, then App modules such as Chat or Navigation sidebar will be shown, otherwise only account module will
    // be available
    this.accountService.user$.subscribe(user => this.user = user);
  }

  /**
   * Removes the Application User.
   */
  onLogoutButtonClick(): void {
    this.accountService.logout();
  }
}
