import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';  // ONLY EVER IMPORT THIS ONE.
import * as actions from '../actions/auth.actions';
@Injectable()
export class AuthEffects {
  private readonly baseUrl = environment.apiUrl;

  // if we logged in send them to the dashboard but DO NOT DISPATCH AN ACTION.
  loginSucceed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loginSucceeded),
      tap(() => this.router.navigate(['dashboard'])) // whatever action comes goes out the other said (loginSucceed => loginSucceeded)
    ), { dispatch: false }
  );

  // this turns a loginRequest => (loginSucceeded | loginFailed)
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loginRequested),
      switchMap(action => this.client.post<{ access_token: string }>(`${this.baseUrl}auth/login`, action.payload)
        .pipe(
          map(response => actions.loginSucceeded({ payload: { username: action.payload.username, token: response.access_token } })),
          catchError(err => of(actions.loginFailed({ payload: 'Login Failed' })))
        )
      )
    ), { dispatch: true }
  );



  constructor(private actions$: Actions, private client: HttpClient, private router: Router) { }
}
