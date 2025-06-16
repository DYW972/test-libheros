import { useRef, forwardRef, Ref } from 'react';

import { Hooks } from '@/shared';
import { TaskCreateForm } from '@/shared/components';
import { LoadingList } from '@/shared/ui';
import { TasksComponentType } from '@/shared/types';

const Tasks = forwardRef<HTMLDivElement, TasksComponentType>(function (
  {
    tasks,
    values,
    isLoading,
    errors,
    handleSubmit,
    onTaskChange,
    isCreatingTask,
    setSelectedTaskId,
    setIsCreatingTask,
  }: TasksComponentType,
  ref: Ref<HTMLDivElement>,
) {
  const taskCreateFormRef = useRef<HTMLDivElement>(null);

  Hooks.useClickOutside(taskCreateFormRef, () => {
    setIsCreatingTask(null);
  });

  return (
    <div className="flex-grow p-6 overflow-y-auto flex flex-col space-y-8">
      {isCreatingTask ? (
        <div ref={taskCreateFormRef}>
          <TaskCreateForm
            values={values}
            errors={errors}
            onTaskChange={onTaskChange}
            handleSubmit={handleSubmit}
          />
        </div>
      ) : (
        <button
          className={`max-w-xs bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition`}
          onClick={() => setIsCreatingTask(true)}
        >
          Ajouter une nouvelle tâche
        </button>
      )}
      {isLoading ? (
        <LoadingList />
      ) : tasks.length ? (
        <section
          ref={ref}
          className="overflow-y-auto flex flex-col space-y-8 max-w-xxl border border-gray-300 rounded p-4 shadow-sm"
        >
          <div className="flex-grow overflow-y-auto divide-y divide-indigo-200">
            {tasks.map((tasks) => (
              <div
                key={tasks.id}
                className={`flex items-center justify-between p-2 hover:bg-indigo-100 cursor-pointer`}
              >
                <h3
                  className="flex-1 text-left text-lg font-medium text-gray-900 cursor-pointer"
                  onClick={() => setSelectedTaskId(tasks.id)}
                >
                  {tasks.title}
                </h3>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p> Vous n'avez aucune tâche dans cette liste...</p>
      )}
    </div>
  );
});

export default Tasks;
