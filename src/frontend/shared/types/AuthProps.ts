import { UserType } from './user.type';

export type TAuthFormProps = {
  values: UserType;
  onChange: (
    field: keyof UserType,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Partial<Record<keyof UserType, string>>;
  handleSubmit: () => void;
};
