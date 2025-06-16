import { TaskListsType } from '@/shared/types';
import React from 'react';

interface ListItemProps {
  taskList: TaskListsType;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function TaskListItemList({
  taskList,
  isActive,
  onSelect,
  onDelete,
}: ListItemProps) {
  return (
    <li
      aria-label={`Task list ${taskList.name}`}
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
      <span className="flex-1 text-left text-lg font-medium text-gray-900 cursor-pointer truncate overflow-hidden whitespace-nowrap">
        {taskList.name}
      </span>
      <button
        aria-label={`Delete task list ${taskList.name}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="ml-4 p-1 rounded hover:bg-red-300 text-red-600 cursor-pointer"
      >
        🗑️
      </button>
    </li>
  );
}
