// src/components/Header.js
import React from 'react';

function Header({ search, setSearch, theme, setTheme }) {
  return (
    <header className="d-flex justify-content-between align-items-center p-3">
      <h2 className="text-primary fw-bold">My To Do</h2>
      <input
        className="form-control w-50 mx-2"
        type="text"
        placeholder="Cari tugas..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button
        className="btn btn-outline-info"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}
export default Header;
