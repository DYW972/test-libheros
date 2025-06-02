import { TTaskCreateFormProps } from '../../../types/TaskCreateForm';

const TaskCreateForm: React.FC<TTaskCreateFormProps> = ({
  task,
  todayISO,
  taskNameIsMissing,
  setTaskNameIsMissing,
  setTask,
  handleSubmit,
}: TTaskCreateFormProps) => {
  return (
    <section className="max-w-xxl border border-gray-300 rounded p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Ajouter une tâche</h3>
      <div className="flex flex-col space-y-3">
        <label className="block text-sm font-medium">Titre</label>
        <input
          type="text"
          maxLength={100}
          required
          value={task.title}
          onChange={(e) => {
            setTaskNameIsMissing(false);
            setTask({ title: e.target.value });
          }}
          className={`w-full border rounded px-3 py-1.5 mb-2 focus:outline-none focus:ring-2 ${taskNameIsMissing ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-400 border-indigo-500'}`}
        />
        {taskNameIsMissing && (
          <p className="text-red-500 text-xs italic pb-3">
            Veuillez indiquer un titre pour votre tâche
          </p>
        )}

        <label className="block text-sm font-medium">Description</label>
        <textarea
          maxLength={500}
          rows={3}
          value={task.description}
          onChange={(e) => setTask({ description: e.target.value })}
          className={`w-full border rounded px-3 py-1.5 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border-indigo-500 resize-y`}
        />

        <label className="block text-sm font-medium">Date d'échéance</label>
        <input
          type="date"
          min={todayISO}
          value={task.dueDate}
          onChange={(e) => setTask({ dueDate: e.target.value })}
          className={`w-full border rounded px-3 py-1.5 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border-indigo-500`}
        />

        <button
          className="self-start bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          onClick={() => {
            void handleSubmit();
          }}
          disabled={taskNameIsMissing}
        >
          Ajouter
        </button>
      </div>
    </section>
  );
};

export default TaskCreateForm;
