import { useState, useEffect, useRef, forwardRef, Ref } from 'react';
import { TTask } from '../../../types/Task';
import { TTaskCreateProps } from '../../../types/TaskCreate';
import TaskCreateForm from './TaskCreateForm';

const TaskCreate = forwardRef<HTMLDivElement, TTaskCreateProps>(function (
  {
    selectedListId,
    tasks,
    fetchTasks,
    selectedTaskId,
    setSelectedTaskId,
  }: TTaskCreateProps,
  ref: Ref<HTMLDivElement>,
) {
  const taskCreateFormRef = useRef<HTMLDivElement>(null);
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const [taskNameIsMissing, setTaskNameIsMissing] = useState<boolean>(false);

  const todayISO = new Date().toISOString().split('T')[0];

  const [task, setTask] = useState<TTask>({
    title: '',
    description: '',
    dueDate: todayISO,
    status: 'todo',
    taskListId: selectedListId,
  });

  function handleClickOutsideTaskCreateForm(event: MouseEvent) {
    const target = event.target as Node;

    if (
      taskCreateFormRef.current &&
      !taskCreateFormRef.current.contains(target)
    ) {
      setCreatingTask(null);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideTaskCreateForm);
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutsideTaskCreateForm,
      );
  }, []);

  useEffect(() => {
    setTask((prev) => ({ ...prev, taskListId: selectedListId }));
  }, [selectedListId]);

  const handleClickOnTask = (taskId: string) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  function handleToggleCreateTask() {
    setCreatingTask(true);
  }

  async function handleSubmit() {
    if (!task.title.trim()) {
      setTaskNameIsMissing(true);
      return;
    }

    try {
      const responseCreateTask = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
        credentials: 'include',
      });

      if (responseCreateTask.ok) {
        await fetchTasks();
        setCreatingTask(false);
        setTask({
          title: '',
          description: '',
          dueDate: todayISO,
          status: 'todo',
          taskListId: selectedListId,
        });
        setTaskNameIsMissing(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex-grow p-6 overflow-y-auto flex flex-col space-y-8">
      {creatingTask ? (
        <div ref={taskCreateFormRef}>
          <TaskCreateForm
            task={task}
            taskNameIsMissing={taskNameIsMissing}
            todayISO={todayISO}
            setTask={(updatedFields) => setTask({ ...task, ...updatedFields })}
            setTaskNameIsMissing={setTaskNameIsMissing}
            handleSubmit={() => {
              void handleSubmit();
            }}
          />
        </div>
      ) : (
        <button
          className={`max-w-xs bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition`}
          onClick={() => {
            void handleToggleCreateTask();
          }}
        >
          Ajouter une nouvelle tâche
        </button>
      )}
      {tasks.length ? (
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
                  onClick={() => handleClickOnTask(tasks.id)}
                >
                  {tasks.title}
                </h3>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
});

export default TaskCreate;
