import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { ProjectSummaryItem } from 'src/app/models';
import { AppState, selectDashboardProjects } from 'src/app/reducers';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projectSummaryItems$: Observable<ProjectSummaryItem[]>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.projectSummaryItems$ = this.store.pipe(
      select(selectDashboardProjects)
    );

    this.route.queryParams.subscribe((params) => {
      if (params.inbox) {
        this.showInbox();
      }
      if (params.project) {
        this.showProject(params.project);
      }
    });
  }

  private showProject(id: string): void {
    const dlg = this.dialog.open(ListComponent, { disableClose: true, data: { filter: 'project', id } });
    dlg.afterClosed().subscribe(_ => this.router.navigate(['dashboard']));
  }
  private showInbox(): void {
    const dlg = this.dialog.open(ListComponent, { disableClose: true, data: { filter: 'inbox' } });
    dlg.afterClosed().subscribe(_ => this.router.navigate(['dashboard']));
  }

}
