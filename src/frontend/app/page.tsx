'use client';
import { Components } from '@/shared';
import { useAuthFormHandler } from '@/features/auth/hooks/useAuthFormHandler';

export default function Login() {
  const { values, onChange, errors, handleSubmit } =
    useAuthFormHandler('signin');

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto h-10 w-auto text-center">Tasks Manager</h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Connectez vous à votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Components.LoginForm
          values={values}
          onChange={onChange}
          errors={errors}
          handleSubmit={() => {
            void handleSubmit();
          }}
        />

        <Components.ClickToAction
          route={`/register`}
          question={`Pas encore de compte ?`}
          action={`Créez un compte`}
        />
      </div>
    </div>
  );
}
