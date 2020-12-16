import { ActionReducerMap, createSelector } from '@ngrx/store';
import { ProjectListItem, ProjectSummaryItem } from '../models';
import { ListItem } from '../models/list-item';
import * as fromProjects from './projects.reducer';
import * as fromTodos from './todos.reducer';
import * as fromAuth from './auth.reducer';

export interface AppState {
  projects: fromProjects.ProjectState;
  todos: fromTodos.TodosState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer,
  todos: fromTodos.reducer,
  auth: fromAuth.reducer
};

// 1. If in a feature, create a featureSelector
//  note: we aren't. We are in the root app module.

// 2. Create a selector for each property off the root of the state.
const selectProjectsBranch = (state: AppState) => state.projects;
const selectTodosBranch = (state: AppState) => state.todos;
const selectAuthBranch = (state: AppState) => state.auth;
// 3. Any helpers that are used.
// look up on google (or bing) "MDN Object Destructuring"

const { selectAll: selectAllProjectsArray, selectTotal: selectProjectCount } =
  fromProjects.adapter.getSelectors(selectProjectsBranch);

const { selectAll: selectAllTodosArray } = fromTodos.adapter.getSelectors(selectTodosBranch);

// const selectAllProjectsArray = fromProjects.adapter.getSelectors(selectProjectsBranch).selectAll;
// const selectProjectCount = fromProjects.adapter.getSelectors(selectProjectsBranch).selectTotal;

const selectInboxEntities = createSelector(
  selectAllTodosArray,
  todos => todos.filter(todo =>
    (todo.dueDate === null || todo.dueDate === undefined) && (todo.project === null || todo.project === undefined))
  // !!todo.dueDate && !!todo.project)
);

// 4. What the component needs.
export const selectIsLoggedIn = createSelector(
  selectAuthBranch,
  b => b.isLoggedIn
);

export const selectAuthToken = createSelector(
  selectAuthBranch,
  b => b.token
);


// TODO: ProjectListItem[]
export const selectProjectListItems = createSelector(
  selectAllProjectsArray,
  projects => projects as ProjectListItem[]
);

export const selectDashboardProjects = createSelector(
  selectAllProjectsArray,
  selectAllTodosArray,
  (projects, todos) => {
    return projects.map(p => ({
      ...p,
      count: todos.filter(t => t.project === p.id).length
    } as ProjectSummaryItem));
  }
);

// ListItem[]
export const selectInboxList = createSelector(
  selectInboxEntities,
  (todos) => {
    return todos
      .map(todo => ({
        ...todo,
      } as ListItem));
  }
);

export const selectCountOfInboxItems = createSelector(
  selectInboxEntities,
  todos => {
    return todos.length;
  }
);

// Paramaterized Selector - when we hook up to this, we are going to supply "props".
export const selectTodosForProject = createSelector(
  selectAllTodosArray,
  selectAllProjectsArray,
  (todos, projects, props: { project: string }) => {
    return todos.filter(todo => todo.project === props.project)
      .map((todo: fromTodos.TodoEntity) => ({
        ...todo,
        project: projects.filter(p => p.id === todo.project)[0]?.name,
      } as ListItem));
  }
);
