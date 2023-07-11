
import React from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskItemProps {
  task: Task;
  updateTask: (taskId: string, updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, updateTask, deleteTask }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedTask = { ...task, status: e.target.value };
    updateTask(task.id, updatedTask);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div>
        <label>Status:</label>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
