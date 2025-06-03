import { ChangeEvent } from 'react';

export type TInput = {
  id: string;
  type: string;
  name: string;
  value: string;
  className: string;
  required?: boolean;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
