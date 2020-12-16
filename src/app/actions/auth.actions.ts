import { Action, createAction, props } from '@ngrx/store';



export const loginRequested = createAction(
  '[app] auth login requested',
  props<{ payload: AuthRequest }>()
);

export const loginSucceeded = createAction(
  '[app] auth login succeeded',
  props<{ payload: AuthResponse }>()
);

export const loginFailed = createAction(
  '[app] auth login failed',
  props<{ payload: string }>()
);

export const logout = createAction(
  '[app] auth logout'
);


export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  username: string;
  token: string;
}
