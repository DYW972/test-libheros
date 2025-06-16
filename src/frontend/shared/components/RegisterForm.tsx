import Input from '../ui/Input';
import { Types } from '@/shared';

const inputClassName =
  'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-indigo-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6';

export default function RegisterForm({
  values,
  onChange,
  errors,
  handleSubmit,
}: Types.TAuthFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Nom d'utilisateur
        </label>
        <div className="mt-2">
          <Input
            id="name"
            type="text"
            name="name"
            required
            value={values.name}
            onChange={onChange('name')}
            className={`${inputClassName} ${errors.name ? 'outline-red-500' : ''}`}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Adresse e-mail
        </label>
        <div className="mt-2">
          <Input
            id="email"
            type="email"
            name="email"
            required
            value={values.email}
            onChange={onChange('email')}
            className={`${inputClassName} ${errors.email ? 'outline-red-500' : ''}`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Mot de passe
        </label>
        <div className="mt-2">
          <Input
            id="password"
            type="password"
            name="password"
            required
            value={values.password}
            onChange={onChange('password')}
            className={`${inputClassName} ${errors.password ? 'outline-red-500' : ''}`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Confirmez votre mot de passe
        </label>
        <div className="mt-2">
          <Input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            required
            value={values.passwordConfirm}
            onChange={onChange('passwordConfirm')}
            className={`${inputClassName} ${errors.passwordConfirm ? 'outline-red-500' : ''}`}
          />
          {errors.passwordConfirm && (
            <p className="text-sm text-red-500 mt-1">
              {errors.passwordConfirm}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Créez votre compte
      </button>
    </div>
  );
}
