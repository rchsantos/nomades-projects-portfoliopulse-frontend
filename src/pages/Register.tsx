import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
    return (
        <div className='container mx-auto flex flex-col md:flex-row min-h-full justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <img className='mx-auto h-12 w-auto' src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg?color=indigo=600' alt='PortfolioPulse Logo ' />
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                    Welcome to your Trading Platform ! 🚀
                </h2>
                <h3 className='mt-6 text-center text-2xl font-bold text-gray-600'>
                    All you need to do is to register to start trading
                </h3>
                <br />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your account
                </h2>
                <RegisterForm />
            </div>

        </div>
    )
};

export default Register;