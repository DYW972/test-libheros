import { forwardRef } from 'react';

import Modal from './Modal';
import { TaskDetailsSidebarProps } from '../../../types/TaskDetailsSidebar';

const TaskDetailsSidebar = forwardRef<HTMLDivElement, TaskDetailsSidebarProps>(
  function TaskDetailsSidebar(
    {
      selectedTask,
      confirmDeleteTask,
      setConfirmDeleteTask,
      fetchTasks,
      setSelectedTaskId,
    },
    ref,
  ) {
    async function handleDeleteTask() {
      const deleteResponse = await fetch(
        `http://localhost:3000/tasks/${selectedTask.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );

      if (deleteResponse.ok) {
        setConfirmDeleteTask(null);
        await fetchTasks();
        setSelectedTaskId('');
      }
    }
    return (
      <aside
        ref={ref}
        className="w-80 bg-gray-50 p-4 border-l border-gray-300 flex flex-col"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={() => setSelectedTaskId(null)}
        >
          ✕
        </button>
        <h3 className="font-semibold text-lg mb-2">{selectedTask.title}</h3>
        <p>
          <span className="font-medium">ID:</span> {selectedTask.id}
        </p>
        <p>
          <span className="font-medium">Description:</span>{' '}
          {selectedTask.description || <em>No description</em>}
        </p>
        <p>
          <span className="font-medium">Date d'échéance:</span>{' '}
          {selectedTask.dueDate}
        </p>
        <p>
          <span className="font-medium">Créée le:</span>{' '}
          {new Date(selectedTask.createdAt).toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Status:</span> {selectedTask.status}
        </p>

        <button
          onClick={() => setConfirmDeleteTask(true)}
          className="mt-auto bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Supprimer
        </button>
        {confirmDeleteTask && (
          <Modal
            title={`Supprimer la tâche "${selectedTask.title}"?`}
            message="Êtes-vous sure de vouloir supprimer cette tâche ?"
            onCancel={() => setConfirmDeleteTask(null)}
            onConfirm={() => {
              void handleDeleteTask();
            }}
          />
        )}
      </aside>
    );
  },
);

export default TaskDetailsSidebar;
