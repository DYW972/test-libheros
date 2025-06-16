import { forwardRef } from 'react';
import { TaskType } from '@/shared/types';

interface TaskDetailsSidebarPropsType {
  selectedTask: TaskType;
  closeModal: () => void;
  handleDeleteTask: () => void;
}

const TaskDetailsSidebar = forwardRef<
  HTMLDivElement,
  TaskDetailsSidebarPropsType
>(function TaskDetailsSidebar(
  { closeModal, selectedTask, handleDeleteTask },
  ref,
) {
  if (!selectedTask) return null;

  return (
    <aside
      ref={ref}
      className="w-xl bg-gray-50 p-4 border-l border-gray-300 flex flex-col relative"
    >
      <button
        aria-label="Close task details"
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
        onClick={closeModal}
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
        onClick={handleDeleteTask}
        className="mt-auto bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Supprimer
      </button>
    </aside>
  );
});

export default TaskDetailsSidebar;
