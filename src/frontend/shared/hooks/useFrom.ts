import { useState } from 'react';
import { ZodSchema, ZodError } from 'zod';

type UseFormOptions<T> = {
  initialValues: T;
  schema?: ZodSchema<T>;
};

export function useForm<T extends Record<string, any>>({
  initialValues,
  schema,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [inputIsEmpty, setInputIsEmpty] = useState(false);

  const onChange =
    (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValues((prev) => ({ ...prev, [field]: newValue }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }

      const empty = Object.values({ ...values, [field]: newValue }).some(
        (val) => !val,
      );
      setInputIsEmpty(empty);
    };

  const validate = (): boolean => {
    if (schema) {
      try {
        schema.parse(values);
      } catch (err) {
        if (err instanceof ZodError) {
          const fieldErrors: Partial<Record<keyof T, string>> = {};
          for (const issue of err.errors) {
            const path = issue.path[0] as keyof T;
            fieldErrors[path] = issue.message;
          }
          setErrors(fieldErrors);
          return false;
        }
      }
    }

    if (
      Object.prototype.hasOwnProperty.call(values, 'password') &&
      Object.prototype.hasOwnProperty.call(values, 'passwordConfirm')
    ) {
      if (values.password !== values.passwordConfirm) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: 'Vos mots de passe ne correspondent pas.',
        }));
        return false;
      }
    }

    return true;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setInputIsEmpty(false);
  };

  return { values, onChange, reset, validate, errors, inputIsEmpty };
}
