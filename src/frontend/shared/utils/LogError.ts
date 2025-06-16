import { z } from 'zod';

export function logError(title: string, error: unknown) {
  if (error instanceof z.ZodError) {
    console.error(`${title}: Validation errors:`, error.flatten().fieldErrors);
  } else if (error instanceof Error) {
    console.error(`${title}: ${error.message}`);
  } else {
    console.error(`${title}: Unknown error`, error);
  }
}
