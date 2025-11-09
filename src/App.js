import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState({ priority: 'All', status: 'All' });
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('dark');
  const [taskToEdit, setTaskToEdit] = useState(null);

  // simpan otomatis ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    setTaskToEdit(null);
  };

  const deleteTask = (id) => {
    if (window.confirm('Yakin ingin menghapus tugas ini?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  return (
    <div className={`app theme-${theme} min-vh-100`}>
      <Header search={search} setSearch={setSearch} theme={theme} setTheme={setTheme} />
      <div className="container py-3">
        <TaskForm
          addTask={addTask}
          updateTask={updateTask}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
        />
        <FilterBar filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={tasks}
          filter={filter}
          search={search}
          setTasks={setTasks}
          onEdit={setTaskToEdit}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
