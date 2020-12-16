import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TodoItemCreate } from '../models';
import { TodoEntity } from '../reducers/todos.reducer';

@Injectable({
  providedIn: 'root'
})
export class TodosDataService {
  readonly baseUri = environment.apiUrl + 'todos/';


  addTodo(todo: TodoItemCreate): Observable<TodoEntity> {
    return this.client.post<TodoEntity>(this.baseUri, todo);
  }

  getAllTodos(): Observable<TodoEntity[]> {
    return this.client.get<{ data: TodoEntity[] }>(this.baseUri)
      .pipe(
        map(r => r.data)
      );
  }

  constructor(private client: HttpClient) { }
}
