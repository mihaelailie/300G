import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { todoItemAdded } from '../../actions/todo-item.actions';
import { ProjectListItem } from '../../models';
import { AppState, selectProjectListItems } from '../../reducers';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.css']
})
export class TodoEntryComponent implements OnInit {

  form: FormGroup;
  projects$: Observable<ProjectListItem[]>;

  constructor(
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<TodoEntryComponent>,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.projects$ = this.store.pipe(
      select(selectProjectListItems)
    );
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      project: [],
      dueDate: []
    });


  }

  submit(): void {
    if (this.form.valid) {
      // do something...
      this.store.dispatch(todoItemAdded({ item: this.form.value }));
      this.bottomSheetRef.dismiss();
    }

  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }

}
