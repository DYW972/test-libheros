import { TasksListCreateFormPropsType } from '@/shared/types';

const inputClassName =
  'w-full border rounded px-3 py-1.5 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border-indigo-500';

export default function CreateTaskListForm({
  value,
  errors,
  onChange,
  nameAlreadyUsed,
  onSubmit,
}: TasksListCreateFormPropsType) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="w-full"
      >
        <input
          value={value}
          onChange={onChange('name')}
          required
          className={`${inputClassName} ${errors.name ? 'outline-red-500' : ''}`}
          placeholder="Nom de la liste"
          maxLength={50}
          autoFocus
          name="name"
          aria-invalid={!!errors.name || nameAlreadyUsed}
          aria-describedby="name-error"
        />
        {(nameAlreadyUsed || errors.name) && (
          <p
            id="name-error"
            className="text-red-500 text-xs italic pb-3"
            role="alert"
          >
            {nameAlreadyUsed ? 'Ce nom existe déjà' : errors.name}
          </p>
        )}
        <button
          type="submit"
          disabled={nameAlreadyUsed}
          className={`w-full bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition ${
            nameAlreadyUsed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
