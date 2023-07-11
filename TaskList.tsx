

import React, { useEffect, useState } from 'react';


interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  isEditing?: boolean; // Add '?' to make it optional
}

interface TaskListProps {
  task: Task;
}

const TaskList: React.FC<TaskListProps> = ({ task }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleEdit = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isEditing: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSave = (taskId: string, updatedTask: Task) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...updatedTask, isEditing: false };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleCancel = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isEditing: false };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleFieldChange = (taskId: string, field: string, value: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, [field]: value };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className='flex-row-reverse bg-red-600'>
      {tasks.map((task) => (
        <div>
        <div key={task.id}>
          {task.isEditing ? (
            <div>
              <input
                value={task.title}
                onChange={(e) => handleFieldChange(task.id, 'title', e.target.value)}
              />
              <input
                value={task.description}
                onChange={(e) => handleFieldChange(task.id, 'description', e.target.value)}
              />
              <input
                value={task.status}
                onChange={(e) => handleFieldChange(task.id, 'status', e.target.value)}
              />
              <button onClick={() => handleSave(task.id, task)}>Save</button>
              <button onClick={() => handleCancel(task.id)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>Title: {task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              <button onClick={() => handleEdit(task.id)}>Edit</button>
            </div>
          )}
        </div>
        </div>
      ))}
    </div>

  );
};

export default TaskList;



