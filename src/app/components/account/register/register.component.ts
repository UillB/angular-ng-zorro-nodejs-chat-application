import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Observer} from "rxjs";
import {UserService} from "../../../core/services/user.service";
import {AccountService} from "../../../core/services/account.service";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * @class
 * Represents the Application registration form view.
 */
export class RegisterComponent {
  // Registration form
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]]
    });
  }

  /**
   * 1. Removes all form fields validators;
   * 2. Register the new User for the entire Application via Account Service;
   * 3. Notifies the newly registered user about joining the Chat Application.
   * @param value {Object} - Object which contains form values
   */
  submitForm(value: { userName: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.registerNewApplicationUser(value);
    this.notifyUserOnRegistrationSuccess(value)
  }

  registerNewApplicationUser(value: any) {
    this.accountService.register({
      name: value.userName,
    });
  }

  notifyUserOnRegistrationSuccess(value: any) {
    this.notificationService.createNotification(
      'success',
      'Successfully registered new user',
      `Hi ${value.userName}! Welcome to the Angular chat. Try it out!`
    );
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  /**
   * RxJS based asynchronous validator which validated the entered
   * data immediately and does not allow User to send some bad data to the backend.
   * @param control {FormControl} - Reactive Form field which is being validated
   */
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.userService.getUsers()
        .subscribe(data => {
          if (data.some(user => user.name === control.value)) {
            observer.next({ error: true, userExists: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        })
    });

}
