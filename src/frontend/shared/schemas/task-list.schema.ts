import { z } from 'zod';

export const TaskListSchema = z.object({
  name: z.string().min(1, `Un nom pour votre liste est requis.`).max(50),
});
