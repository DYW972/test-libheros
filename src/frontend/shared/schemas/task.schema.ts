import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(1, `Veuillez indiquer le nom de votre tâche`),
  description: z.string(),
  dueDate: z.string(),
  taskListId: z.string().uuid(),
});
