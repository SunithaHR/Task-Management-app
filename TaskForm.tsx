
import React, { useState } from 'react';


interface TaskFormProps {
  onSubmit: (title: string, description: string, status: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, status);
    setTitle('');
    setDescription('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex grid justify-items-center'>
      <div>
      <label className='text-slate-950'>Title</label><br />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className='border-slate-800 border-2 rounded-md '
      /> <br/><br/>
      <label className='text-slate-950'>Task Description</label><br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className='border-slate-800 border-2 rounded-md'></textarea>
      <br/><br/>
      <label className='text-black'>Task Status</label><br />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Task Status"
        className='border-slate-800 border-2 rounded-md'
      />
      <br /><br />
      <button type="submit" className='ms-12 p-1 border-green-700 bg-green-700 text-white border-2 rounded-md'>Add Task</button><br /><br />
      </div>
    </form>
  );
};

export default TaskForm;
