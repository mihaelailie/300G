import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectIsLoggedIn } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn: boolean;

  constructor(store: Store<AppState>, private router: Router) {
    store.pipe(
      select(selectIsLoggedIn)
    ).subscribe(on => this.loggedIn = on);
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // if they are logged in, just return true. no problem. carry on.
    if (this.loggedIn) {
      return true;
    } else {
      // if they are NOT logged in, send them to the login route and return false.
      this.router.navigate(['login']);
      return false;
    }
  }
}
