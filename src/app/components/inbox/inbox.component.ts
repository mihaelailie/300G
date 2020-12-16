import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectCountOfInboxItems } from 'src/app/reducers';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  count$: Observable<number>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.count$ = this.store.pipe(
      select(selectCountOfInboxItems)
    );
  }

}
