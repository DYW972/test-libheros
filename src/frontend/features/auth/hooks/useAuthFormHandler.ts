import { useAuth } from '@/shared/context/auth.context';
import { Hooks } from '@/shared';
import { UserType } from '@/shared/types';
import { UserSchema } from '@/shared/schemas';

export function useAuthFormHandler(authType: 'signin' | 'signup') {
  const { signin, signup } = useAuth();
  const { values, onChange, validate, reset, errors } = Hooks.useForm<UserType>(
    {
      initialValues:
        authType === 'signup'
          ? { name: '', email: '', password: '', passwordConfirm: '' }
          : { email: '', password: '' },
      schema: UserSchema,
    },
  );

  async function handleSubmit() {
    if (!validate()) return;

    if (authType === 'signin') {
      const { email, password } = values;
      await signin(email, password);
    } else {
      const { passwordConfirm: _, name, email, password } = values;
      await signup(name, email, password);
    }

    reset();
  }

  return { values, onChange, errors, handleSubmit };
}
