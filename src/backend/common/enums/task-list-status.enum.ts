import { z } from 'zod';

export const TaskListStatusEnum = z.enum(['open', 'closed', 'archived']);

export type TTaskListStatusEnum = z.infer<typeof TaskListStatusEnum>;
