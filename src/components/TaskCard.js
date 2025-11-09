import React from 'react';

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="card my-2 shadow-sm p-3 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{task.title}</h5>
        <span
          className={`badge bg-${
            task.priority === 'High'
              ? 'danger'
              : task.priority === 'Medium'
              ? 'warning'
              : 'success'
          }`}
        >
          {task.priority}
        </span>
      </div>
      <p className="mb-1">{task.description}</p>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <small>Deadline: {task.deadline || '-'}</small>
        <span
          className={`badge bg-${
            task.status === 'Done'
              ? 'success'
              : task.status === 'In Progress'
              ? 'info'
              : 'secondary'
          }`}
        >
          {task.status}
        </span>
        <div>
          <button className="btn btn-sm btn-outline-secondary mx-1" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
