// src/components/TaskForm.js
import React, { useState } from 'react';

function TaskForm({ setTasks, tasks }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Medium',
    status: 'To Do'
  });

  const handleSubmit = e => {
    e.preventDefault();
    setTasks([...tasks, { ...form, id: Date.now() }]);
    setForm({ title: '', description: '', deadline: '', priority: 'Medium', status: 'To Do' });
  };

  return (
    <form className="row g-2 p-3" onSubmit={handleSubmit}>
      <input className="form-control" placeholder="Judul" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} required />
      <input className="form-control" placeholder="Deskripsi" value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })} />
      <input className="form-control" type="date" value={form.deadline}
        onChange={e => setForm({ ...form, deadline: e.target.value })} />
      <select className="form-select" value={form.priority}
        onChange={e => setForm({ ...form, priority: e.target.value })}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <select className="form-select" value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button className="btn btn-primary w-100" type="submit">Tambah Tugas</button>
    </form>
  );
}
export default TaskForm;
