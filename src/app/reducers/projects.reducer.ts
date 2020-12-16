import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/project.actions';
export interface ProjectEntity {
  id: string;
  name: string;
}

export interface ProjectState extends EntityState<ProjectEntity> {

}

export const adapter = createEntityAdapter<ProjectEntity>();

const initialState = adapter.getInitialState();


const reducerFunction = createReducer(
  initialState,
  on(actions.loadProjects, actions.loadProjectsFailure, () => initialState),
  on(actions.loadProjectsSucceeded, (state, action) => adapter.setAll(action.payload, state))
);

export function reducer(state: ProjectState = initialState, action: Action): ProjectState {
  return reducerFunction(state, action);
}



