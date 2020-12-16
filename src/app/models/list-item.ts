export interface ListItem {
  id: string;
  name: string;
  project: string; // need the name of the project, not the id.
  dueDate: string;
  completed: boolean;
}
