import React from 'react';
import LoginForm from '../components/LoginForm';


const Login: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row min-h-full justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <h3 className="mt-6 text-center text-2xl font-bold text-gray-600">
          Access all your trading tools
        </h3>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;