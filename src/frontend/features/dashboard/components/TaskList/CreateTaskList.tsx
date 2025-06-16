import { TaskListsType } from '@/shared/types';
import { useForm } from '@/shared/hooks/useForm';
import { TaskListSchema } from '@/shared/schemas';
import { useTasksLists } from '@/shared/context/taskList.context';
import CreateTaskListForm from '@/features/dashboard/components/TaskList/CreateTaskListForm';

type CreateTaskListProps = {
  onClose: () => void;
};

function CreateTaskList({ onClose }: CreateTaskListProps) {
  const { values, onChange, errors, validate, reset } = useForm<
    Partial<TaskListsType>
  >({
    initialValues: { name: '' },
    schema: TaskListSchema,
  });

  const { tasksLists, createTasksList } = useTasksLists();
  const nameAlreadyUsed = tasksLists.some(
    (element) => element.name.trim() === values.name.trim(),
  );

  const handleSubmit = async () => {
    if (!validate()) return;
    if (nameAlreadyUsed) return;
    await createTasksList(values.name);
    reset();
    onClose();
  };

  return (
    <CreateTaskListForm
      value={values.name}
      errors={errors}
      onChange={onChange}
      nameAlreadyUsed={nameAlreadyUsed}
      onSubmit={() => {
        void handleSubmit();
      }}
    />
  );
}

export default CreateTaskList;
