// task-list.schema.ts
import { z } from 'zod';
import { TaskListStatusEnum } from 'common';

export const TaskListBaseSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).optional(),
  status: TaskListStatusEnum.optional().default(TaskListStatusEnum.Enum.open),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateTaskListSchema = TaskListBaseSchema.extend({
  userId: z.string().uuid().optional(),
}).optional();

export const UpdateTaskListSchema = CreateTaskListSchema;

export const TaskListOutputSchema = TaskListBaseSchema;

export type TaskListOutput = z.infer<typeof TaskListOutputSchema>;
export type CreateTaskList = z.infer<typeof CreateTaskListSchema>;
export type UpdateTaskList = z.infer<typeof UpdateTaskListSchema>;
