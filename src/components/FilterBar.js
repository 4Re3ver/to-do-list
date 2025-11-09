// src/components/FilterBar.js
import React from 'react';

function FilterBar({ filter, setFilter }) {
  return (
    <div className="d-flex gap-2 align-items-center my-2">
      <select className="form-select w-auto"
        value={filter.priority}
        onChange={e => setFilter({ ...filter, priority: e.target.value })}>
        <option value="All">Semua Prioritas</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <select className="form-select w-auto"
        value={filter.status}
        onChange={e => setFilter({ ...filter, status: e.target.value })}>
        <option value="All">Semua Status</option>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
    </div>
  );
}
export default FilterBar;
