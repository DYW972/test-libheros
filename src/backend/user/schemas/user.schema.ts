import { BaseRoleSchema } from 'role/schemas/role.schema';
import { z } from 'zod';

export const UserBaseSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
  role: BaseRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = UserBaseSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const UserOutputSchema = UserBaseSchema;

export type UserOutput = z.infer<typeof UserOutputSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
