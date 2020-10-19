import { Injectable, Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })

/**
 * Global Utility service which for now mainly determines
 * the application server URL for making the HTTP requests.
 * Should be expandable in the future
 */
export class UtilitiesService {
  constructor(@Inject('Window') private window: Window) { }

  getApiUrl() {
    const port = this.getPort();
    return `${this.window.location.protocol}//${this.window.location.hostname}${port}`;
  }

  private getPort() {
    const port = this.window.location.port;
    if (port) {
      if (port === '4200') {
        // Automatically reach to the specified server port if
        // application has been started with angular CLI default 'ng serve --open' command
        return ':3001';
      }
      // Running with local node (which serves Angular and the API)
      return ':' + this.window.location.port;
    }
    return '';
  }
}
