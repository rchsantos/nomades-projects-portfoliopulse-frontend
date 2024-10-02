import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, LoginData } from '../services/AuthService';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await login({ username, password } as LoginData);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      console.log('Login successful');
      setSuccess('Login successful');
      navigate('/');
    }
    catch (error: any) {
      console.error('Login failed', error);
      setError(error.message || 'Login failed. Please try again');
    }
  };

  return (
    <form className='space-y-6 mt-6' onSubmit={handleSubmit}>
      <div className="mt-2 flex flex-col">
        <label
          htmlFor='username'
          className='self-start text-sm font-medium leading-6 text-gray-900'>
          Username
        </label>
        <input
          id='username'
          name='username'
          type='text'
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
      </div>

      <div className="mt-2 flex flex-col">
        <label
          htmlFor='password'
          className='self-start text-sm font-medium leading-6 text-gray-900'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
      </div>

      <div>
        <button
          type="submit"
          className="bg-global-color-primary p-4 t flex w-full justify-center rounded-md font-semibold text-black hover:bg-global-color-secondary hover:text-white focus:ring-4"
        >
          Sign in
        </button>
      </div>
      <div className='mt-2 flex items-center justify-center'>
        <a href='/register' className='p-2 text-sm text-indigo-600 hover:text-indigo-500'>
            Create your account
        </a>
      </div>

      {/* <div className='mt-2 flex items-center justify-between'>
        <div className='text-sm'>
          <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
            Forgot your password?
          </a>
        </div>
      </div> */}

      {error && <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400' role='alert'>
        <span className="font-medium">{error}</span>
        </div>
      }
      {success && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400" role="alert">
        <span className="font-medium">{success}</span>
      </div>
      }

    </form>
  );

}

export default LoginForm;