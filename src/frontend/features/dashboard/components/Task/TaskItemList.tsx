import { TaskType } from '@/shared/types';
import React from 'react';

interface TaskItemProps {
  task: TaskType;
  isActive: boolean;
  onSelect: () => void;
}

export function TaskItemList({ task, isActive, onSelect }: TaskItemProps) {
  return (
    <li
      aria-label={`Task list ${task.title}`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect();
      }}
      className={`
        flex items-center justify-between p-2 rounded ${
          isActive ? 'bg-indigo-200' : 'hover:bg-indigo-100 cursor-pointer'
        }`}
    >
      <span className="flex-1 text-left text-lg font-medium text-gray-900 cursor-pointer">
        {task.title}
      </span>
    </li>
  );
}
