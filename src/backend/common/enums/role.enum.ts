import { z } from 'zod';

export const UserRoleEnum = z.enum(['user', 'admin']);

export type TUserRoleEnum = z.infer<typeof UserRoleEnum>;
