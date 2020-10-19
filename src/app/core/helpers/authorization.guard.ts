import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
/**
 * @class
 * Authorization Guard which is needed for the App main routing module.
 */
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {
  }

  /**
   * Hides the main Application route 'Chat' if user is not authenticated
   * @param route {Router} - instance of Angular built-in Router class
   * @param state {RouterStateSnapshot} - current Application route state
   * @return boolean
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.accountService.user;
    if (user) {
      return true;
    }
    this.router.navigate(['./']);
    return false
  }

}
