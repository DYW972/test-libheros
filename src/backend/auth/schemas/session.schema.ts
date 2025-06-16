import { z } from 'zod';

export const SessionBaseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  hashedToken: z.string().max(255),
  role: z.string(),
  ip: z.string().max(45),
  userAgent: z.string().max(255),
  isRevoked: z.boolean(),
  expiresAt: z.date(),
  revokedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateSessionSchema = SessionBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateSessionSchema = CreateSessionSchema.partial();

export const SessionOutputSchema = SessionBaseSchema;

export type SessionOutput = z.infer<typeof SessionOutputSchema>;
export type CreateSession = z.infer<typeof CreateSessionSchema>;
export type UpdateSession = z.infer<typeof UpdateSessionSchema>;
