import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, `Veuillez indiquer un nom d'utilisateur`).optional(),
  email: z
    .string({ required_error: 'Veuillez indiquer votre adresse e-mail' })
    .email('Votre adresse e-mail est invalide'),
  password: z
    .string()
    .min(6, 'Votre mot de passe doit contenir au minimum 6 characters')
    .optional(),
  passwordConfirm: z
    .string()
    .min(6, 'Veuillez confirmer votre mot de passe')
    .optional(),
});
