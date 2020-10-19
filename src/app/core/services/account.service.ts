import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {ModalService} from "./modal.service";

@Injectable({
  providedIn: 'root'
})

/**
 * @class
 * Account Service class which is being used across the entire Application
 * 1. Provides the data about current Logged in user;
 * 2. Responsible for the new User registration;
 * 3. Responsible for the Application User logout.
 */
export class AccountService {

  users: User[];

  /**
   * RxJS Subject which is responsible for managing the Application user state across the Application
   * @private - keep the state of this subject inside one service
   */
  private userSubject$: BehaviorSubject<User>;
  /**
   * RxJS Observable Object which allows to subscribe and listen for any User related changes
   * on particular Component level
   */
  public user$: Observable<User>;

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: ModalService
  ) {
    // Create new subject based on localStorage key 'user'. If key does not exist, then Application
    // will recognize that User is not logged in.
    this.userSubject$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    // Allows the component to subscribe and listen for any manipulations which have been done to the User.
    this.user$ = this.userSubject$.asObservable();
  }

  /**
   * Return current Application User. Getter which is being used across many separated
   * Application components
   * @return {User}
   */
  public get user(): User {
    return this.userSubject$.value;
  }

  /**
   * Register new Application User by creating localStorage 'user' key and
   * notifying the User related RxJS Behavior Subject that User has been created.
   * @param user {User} - new Application User to set.
   */
  register(user: User): User {
    this.userService.registerUser(user)
      .subscribe((data) => {
        const applicationUser = {
          name: user.name,
          id: data.userId
        };
        localStorage.setItem('user', JSON.stringify(applicationUser));
        this.userSubject$.next(applicationUser);
        this.router.navigate(['/chat']);
        }
      );
    return user;
  }

  /**
   * 1. Deletes the 'user' key from the localStorage, creating 'User logout' effect
   * 2. Notifies User related RxJS Behavior Subject that Application User is not logged in anymore.
   */
  logout(): void {
    this.modalService.showConfirmModal(
      'Are you sure want to logout?',
      'You will be automatically redirected to the login form and all currently opened channel connections will be closed.',
      () => {
        localStorage.removeItem('user');
        this.userSubject$.next(null);
        this.router.navigate(['/account/register']);
      }
    )
  }
}
