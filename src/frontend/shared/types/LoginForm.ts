import { TUser } from './User';
export type TLoginFormProps = {
  values: TUser;
  onChange: (
    field: keyof TUser,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Partial<Record<keyof TUser, string>>;
  handleSubmit: () => void;
};
