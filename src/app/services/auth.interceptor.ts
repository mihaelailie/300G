import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthToken, selectIsLoggedIn } from '../reducers';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isLoggedIn: boolean;
  token: string;

  constructor(private store: Store<AppState>) {
    this.store.pipe(
      select(selectIsLoggedIn)
    ).subscribe(r => this.isLoggedIn = r);

    this.store.pipe(
      select(selectAuthToken)
    ).subscribe(r => this.token = r);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if the url is for the API and NOT for the authUrl
    // consider making an 'approved list' of urls you will send the token to.
    if (req.url !== environment.apiUrl + 'auth/token' && this.isLoggedIn) {
      const newHeaders = req.headers.append('Authorization', 'Bearer ' + this.token);
      const authRequest = req.clone({ headers: newHeaders });
      return next.handle(authRequest);
    } else {
      //  then check to see if they are logged in. If they are, then add the token to the Authorization header
      //  otherwise... don't do anything (or just say 'do the next thing')
      return next.handle(req);
    }
  }

}
