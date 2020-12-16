import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProjectSummaryItem } from 'src/app/models';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {

  @Input() items: ProjectSummaryItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
