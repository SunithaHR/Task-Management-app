
import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';

const Home: React.FC = () => {
  const { tasks, createTask, deleteTask, updateTask } = useTasks();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

  const handleCreateTask = (title: string, description: string, status: string) => {
    const newTask = {
      id: String(Date.now()),
      title,
      description,
      status,
    };
    createTask(newTask);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleEditTask = (taskId: string, title: string, description: string, status: string) => {
    setEditingTaskId(taskId);
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedStatus(status);
  };

  const handleSaveTask = () => {
    if (editingTaskId) {
      const updatedTask = {
        id: editingTaskId,
        title: editedTitle,
        description: editedDescription,
        status: editedStatus,
      };
      updateTask(editingTaskId,updatedTask);
      setEditingTaskId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline bg-red-600 flex-row justify-center scroll-my-1.5 flex flex-row justify-content-center">Task Management Application</h1><br />
      <TaskForm onSubmit={handleCreateTask} />
      <h1 className="text-3xl font-bold underline bg-red-600 flex-row justify-center scroll-my-1.5 flex flex-row justify-around">Task List</h1><br />
      {tasks.length > 0 ? (
        <ul className='flex flex-row justify-around grid grid-cols-4 gap-4'>
          {tasks.map((task) => (
            <li key={task.id} className='bg-white rounded-2xl m-4 w-80 p-6'>
              {editingTaskId === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className='border-slate-800 border-2 rounded-md'
                  />
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className='border-slate-800 border-2 rounded-md mt-2'
                  />
                  <input
                    type="text"
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className='border-slate-800 border-2 rounded-md mt-2'
                  /><br/><br />
                  <button onClick={handleSaveTask} className='border-slate-800 border-2 rounded-md mx-1 p-px bg-blue-600'>Save</button>
                  <button onClick={handleCancelEdit} className='border-slate-800 border-2 rounded-md mx-1 p-px bg-blue-600'>Cancel</button>
                </div>
              ) : (
               
                <div>
                    <h3>Title: {task.title}</h3>
                    <p>Description: {task.description}</p>
                    <p>Status: {task.status}</p><br />
                    <button onClick={() => handleDeleteTask(task.id)} className='border-slate-800 border-2 rounded-md mx-1 p-px bg-blue-600'>Delete</button>
                    <button onClick={() => handleEditTask(task.id, task.title, task.description, task.status)} className='border-slate-800 border-2 rounded-md mx-1 p-px bg-blue-600'>
                      Edit
                    </button><br /><br />
                  </div>
                  
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Home;
