'use client';
import { Components } from '@/shared';
import { useAuthFormHandler } from '@/features/auth/hooks/useAuthFormHandler';

export default function Register() {
  const { values, onChange, errors, handleSubmit } =
    useAuthFormHandler('signup');

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto h-10 w-auto text-center">Tasks Manager</h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Créez votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Components.RegisterForm
          values={values}
          onChange={onChange}
          errors={errors}
          handleSubmit={() => {
            void handleSubmit();
          }}
        />

        <Components.ClickToAction
          route={`/`}
          question={`Vous avez déjà un compte ?`}
          action={`Connectez vous`}
        />
      </div>
    </div>
  );
}
