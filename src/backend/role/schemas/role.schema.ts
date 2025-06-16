// role.schema.ts
import { z } from 'zod';

export const BaseRoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateRoleSchema = BaseRoleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateRoleSchema = CreateRoleSchema.partial();

export const OutputRoleSchema = BaseRoleSchema;

export type RoleOutput = z.infer<typeof OutputRoleSchema>;
export type CreateRoleInput = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleInput = z.infer<typeof UpdateRoleSchema>;
