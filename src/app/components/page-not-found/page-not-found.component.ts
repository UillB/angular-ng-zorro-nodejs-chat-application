import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(private router: Router) { }

  /**
   * Navigates to the Application main 'Chat' view when user clicks 'Go to' button
   * Automatically redirect to the Account Registration module if User is not authorized
   */
  onHomeNavigateClick(): void {
    this.router.navigate(['/chat']);
  }

}
