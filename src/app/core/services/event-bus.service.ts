import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * Event Bus Service which allows to send the custom events across
 * all Application component without the need of connecting them to one global Application state
 */
export class EventBusService {

  subject$ = new Subject<any>();

  constructor() { }

  /**
   * Creates the listener for a particular event
   * @param event {Events} - event type described in the Events enum below
   * @param action - action to be executed whenever subscribed Event has been emitted
   */
  on(event: Events, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: EmitEvent) => {
          return e.name === event;
        }),
        map((e: EmitEvent) => {
          return e.value;
        })
      )
      .subscribe(action);
  }

  /**
   * Emits an event which triggers the needed listener in the Component
   * @param event
   */
  emit(event: EmitEvent) {
    this.subject$.next(event);
  }
}

/**
 * @class
 * EmitEvent factory
 */
export class EmitEvent {
  constructor(public name: any, public value?: any) { }
}

/**
 * List of all available events that will be recognized by this Service
 */
export enum Events {
  newUserJoined,
  chatMessageSent,
  newChatCreated
}
