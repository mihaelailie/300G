import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ListItem } from 'src/app/models/list-item';
import { AppState, selectInboxList, selectTodosForProject } from 'src/app/reducers';
import { TodoEntity } from 'src/app/reducers/todos.reducer';
import * as actions from '../../actions/todo-item.actions';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list$: Observable<ListItem[]>;
  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { filter: string, id: string }
  ) { }

  ngOnInit(): void {
    switch (this.data.filter) {
      case 'inbox': {
        this.list$ = this.store.pipe(
          select(selectInboxList)
        );
        break;
      }
      case 'project': {
        this.list$ = this.store.pipe(
          select(selectTodosForProject, { project: this.data.id })
        );
        break;
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  markComplete(todo: TodoEntity): void {
    this.store.dispatch(actions.markTodoItemCompleted({ payload: todo }));
  }
  markIncomplete(todo: TodoEntity): void {
    this.store.dispatch(actions.markTodoItemIncomplete({ payload: todo }));
  }
}
