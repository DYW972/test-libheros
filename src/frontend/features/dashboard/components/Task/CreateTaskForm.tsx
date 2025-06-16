import { TaskCreateFormPropsType } from '@/shared/types';

const inputClassName =
  'w-full border rounded px-3 py-1.5 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border-indigo-500';

export default function CreateTaskForm({
  values,
  onChange: onTaskChange,
  onSubmit,
  errors,
}: TaskCreateFormPropsType) {
  return (
    <section className="max-w-xxl border border-gray-300 rounded p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Ajouter une tâche</h3>
      <div className="flex flex-col space-y-3">
        <label className="block text-sm font-medium">Titre</label>
        <input
          type="text"
          required
          value={values.title}
          onChange={onTaskChange('title')}
          className={`${inputClassName} ${errors.title ? 'outline-red-500' : ''}`}
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title}</p>
        )}

        <label className="block text-sm font-medium">Description</label>
        <textarea
          maxLength={500}
          rows={3}
          value={values.description}
          onChange={onTaskChange('description')}
          className={`${inputClassName} ${errors.description ? 'outline-red-500' : ''}`}
        />

        <label className="block text-sm font-medium">Date d'échéance</label>
        <input
          type="date"
          min={new Date().toISOString().split('T')[0]}
          value={values.dueDate}
          onChange={onTaskChange('dueDate')}
          className={`${inputClassName} ${errors.dueDate ? 'outline-red-500' : ''}`}
        />

        <button
          className="self-start bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          onClick={() => {
            void onSubmit();
          }}
        >
          Ajouter
        </button>
      </div>
    </section>
  );
}
