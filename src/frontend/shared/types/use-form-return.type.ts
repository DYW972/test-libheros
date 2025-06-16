import { ChangeEvent } from 'react';

export type UseFormReturnType<T> = {
  values: T;
  reset: () => void;
  inputIsEmpty: boolean;
  checkEmptyFields: () => boolean;
  emptyFields: Partial<Record<keyof T, boolean>>;
  onChange: (field: keyof T) => (e: ChangeEvent<HTMLInputElement>) => void;
};
