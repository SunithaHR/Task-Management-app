
import { types } from 'mobx-state-tree';

export const TaskStatus = types.enumeration(['To Do', 'In Progress', 'Completed']);

export const Task = types.model('Task', {
  id: types.identifier,
  title: types.string,
  description: types.string,
  status: TaskStatus,
});
