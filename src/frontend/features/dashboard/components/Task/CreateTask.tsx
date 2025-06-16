import CreateTaskForm from './CreateTaskForm';
import { TaskType } from '@/shared/types';
import { useForm } from '@/shared/hooks';
import { TaskSchema } from '@/shared/schemas';
import { useTasks } from '@/shared/context/task.context';

type CreateTaskProps = {
  taskListId: string;
  onClose: () => void;
};

export default function CreateTask({ taskListId, onClose }: CreateTaskProps) {
  const { values, onChange, errors, validate, reset } = useForm<
    Partial<TaskType>
  >({
    initialValues: {
      title: '',
      description: '',
      taskListId: taskListId,
      dueDate: new Date().toISOString().split('T')[0],
    },
    schema: TaskSchema,
  });

  const { createTask } = useTasks();

  const handleSubmit = async () => {
    if (!validate()) return;
    const { title, description, dueDate, taskListId } = values;
    await createTask(title, description, dueDate, taskListId);
    reset();
    onClose();
  };
  return (
    <CreateTaskForm
      values={values}
      errors={errors}
      onChange={onChange}
      onSubmit={() => {
        void handleSubmit();
      }}
    />
  );
}
