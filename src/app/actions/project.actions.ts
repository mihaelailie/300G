import { createAction, props } from '@ngrx/store';
import { ProjectEntity } from '../reducers/projects.reducer';

// initiator - when this is dispatched we are saying "go do something"
export const loadProjects = createAction(
  '[app] load project data'
);

// successs - that thing you asked me to do? it worked as planned.
export const loadProjectsSucceeded = createAction(
  '[app] load projects succeeded',
  props<{ payload: ProjectEntity[] }>()
);

// failure - it didn't go so well, here's why.
export const loadProjectsFailure = createAction(
  '[app] load projects failed',
  props<{ payload: string }>()
);
