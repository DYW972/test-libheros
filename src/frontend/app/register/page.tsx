'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { TResponseError } from '../../types/ResponseError';

export default function Register() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  async function handleRegisterUser(e: React.FormEvent) {
    e.preventDefault();

    if (user.password !== user.passwordConfirm) {
      console.log("Passwords don't match.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
        credentials: 'include',
      });

      if (!res.ok) {
        const error = (await res.json()) as TResponseError;
        if (error && typeof error.message === 'string') {
          console.error('Registration failed: ' + error.message);
        } else {
          console.error('Registration failed: unknown error');
        }
        return;
      }

      router.push('/home');
    } catch (err) {
      console.error('Registration error: ' + (err as Error).message);
    }
  }

  const onChange =
    (field: keyof typeof user) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto h-10 w-auto text-center">Tasks Manager</h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Créez votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            void handleRegisterUser(e);
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Nom
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                required
                value={user.name}
                onChange={onChange('name')}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
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
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                value={user.email}
                onChange={onChange('email')}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
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
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                value={user.password}
                onChange={onChange('password')}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
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
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                required
                value={user.passwordConfirm}
                onChange={onChange('passwordConfirm')}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Créez votre compte
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Vous avez déjà un compte ?&nbsp;
          <Link
            href="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Connectez vous
          </Link>
        </p>
      </div>
    </div>
  );
}
