import { z } from 'zod';

export const TaskStatusEnum = z.enum(['todo', 'inprogress', 'done']);

export type TTaskStatusEnum = z.infer<typeof TaskStatusEnum>;
