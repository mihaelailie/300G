import { createAction, props } from '@ngrx/store';
import { TodoItemCreate } from '../models';
import { TodoEntity } from '../reducers/todos.reducer';

let fakeId = 1;

// Initiator
export const todoItemAdded = createAction(
  '[app] todo item added',
  ({ item }: { item: TodoItemCreate }) => ({
    payload: {
      ...item,
      id: 'T' + fakeId++
    } as TodoEntity
  })
);

export const todoItemAddedSuccessfully = createAction(
  '[app] todo item added successfully',
  props<{ oldId: string, payload: TodoEntity }>()
);

export const todoItemAddedFailure = createAction(
  '[app] todo item added failure',
  props<{ message: string, payload: TodoEntity }>()
);

export const markTodoItemCompleted = createAction(
  '[app] todo item marked completed',
  props<{ payload: TodoEntity }>()
);

export const markTodoItemIncomplete = createAction(
  '[app] todo item marked incomplete',
  props<{ payload: TodoEntity }>()
);


export const clearCompletedTodoItems = createAction(
  '[app] clear completed todo items'
);


export const loadTodos = createAction(
  '[app] load todos'
);

export const loadTodosSucceeded = createAction(
  '[app] load todos succeeded',
  props<{ payload: TodoEntity[] }>()
);

export const loadTodosFailed = createAction(
  '[app] load todos failed',
  props<{ payload: string }>()
);
