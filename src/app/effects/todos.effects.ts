import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';  // ONLY EVER IMPORT THIS ONE.
import * as actions from '../actions/todo-item.actions';
import { loginSucceeded } from '../actions/auth.actions';
import { TodosDataService } from '../services/todos-data.service';

@Injectable()
export class TodoEffects {

  loadDataOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSucceeded),
      map(() => actions.loadTodos())
    )
  );

  saveTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.todoItemAdded),
      switchMap(originalAction => this.service.addTodo({
        name: originalAction.payload.name,
        dueDate: originalAction.payload.dueDate,
        project: originalAction.payload.project
      })
        .pipe(
          map(response => actions.todoItemAddedSuccessfully({ oldId: originalAction.payload.id, payload: response })),
          catchError(() => of(actions.todoItemAddedFailure({ message: 'Could not Add Todo', payload: originalAction.payload })))
        )
      )
    ), { dispatch: true }
  );

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadTodos),
      switchMap(() => this.service.getAllTodos()
        .pipe(
          map(payload => actions.loadTodosSucceeded({ payload })),
          catchError(() => of(actions.loadTodosFailed({ payload: 'Could not load todos' })))
        )
      )
    )
  );

  constructor(private service: TodosDataService, private actions$: Actions) { }
}
