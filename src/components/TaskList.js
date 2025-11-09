import React from 'react';
import TaskCard from './TaskCard';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableTask({task, onEdit, onDelete}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({id: task.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 99 : 'auto'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

export default function TaskList({ tasks, filter, search, setTasks }) {
  // Filter & search logic
  const filtered = tasks.filter(t =>
    (filter.priority === 'All' || t.priority === filter.priority) &&
    (filter.status === 'All' || t.status === filter.status) &&
    (t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = filtered.findIndex(t => t.id === active.id);
      const newIndex = filtered.findIndex(t => t.id === over.id);
      const newArray = arrayMove(filtered, oldIndex, newIndex);
      // Update order in main state
      setTasks(
        tasks.map(t => newArray.find(r => r.id === t.id) || t)
      );
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={filtered.map(t => t.id)} strategy={verticalListSortingStrategy}>
        {filtered.map(task => (
          <SortableTask
            key={task.id}
            task={task}
            onEdit={() => {/* implementasi edit nanti */}}
            onDelete={() => setTasks(tasks.filter(t => t.id !== task.id))}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
