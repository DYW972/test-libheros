// task.schema.ts
import { z } from 'zod';
import { TaskStatusEnum } from 'common';

export const TaskBaseSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z
    .string()
    .max(500, { message: 'Description must be at most 500 characters' })
    .optional()
    .nullable()
    .transform((val) => val ?? ''),
  dueDate: z.coerce
    .date({ invalid_type_error: 'Invalid date format' })
    .optional(),
  status: TaskStatusEnum.optional(),
});

export const CreateTaskSchema = TaskBaseSchema.extend({
  status: TaskBaseSchema.shape.status.default('todo'),
  taskListId: z
    .string()
    .uuid({ message: 'Task list ID must be a valid UUID' })
    .optional(),
  userId: z
    .string()
    .uuid({ message: 'User ID must be a valid UUID' })
    .optional(),
});

export const UpdateTaskSchema = CreateTaskSchema.partial();

export const TaskOutputSchema = TaskBaseSchema;

export type TaskOutput = z.infer<typeof TaskOutputSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
