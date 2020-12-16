import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { clearCompletedTodoItems } from 'src/app/actions/todo-item.actions';
import { AppState } from 'src/app/reducers';
import { TodoEntryComponent } from '../todo-entry/todo-entry.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(
    private bottomSheet: MatBottomSheet,
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  addItem(): void {
    const config: MatBottomSheetConfig = {
      disableClose: true,
      autoFocus: true
    };
    this.bottomSheet.open(TodoEntryComponent, config);
  }

  clearCompleted(): void {
    this.store.dispatch(clearCompletedTodoItems());
  }

}
