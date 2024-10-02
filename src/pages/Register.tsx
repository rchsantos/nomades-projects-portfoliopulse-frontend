import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col flex-1 items-center justify-center min-h-screen sm:w-2 bg-neutral-strongest">
                <div className='h-9'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 176 40"><path fill="#00FFC4" fill-rule="evenodd" d="M15 28a5 5 0 0 1-5-5V0H0v23c0 8.284 6.716 15 15 15h11V28H15ZM45 10a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-19 9C26 8.507 34.507 0 45 0s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM153 10a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9Zm-19 9c0-10.493 8.507-19 19-19s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM85 0C74.507 0 66 8.507 66 19s8.507 19 19 19h28c1.969 0 3.868-.3 5.654-.856L124 40l5.768-10.804A19.007 19.007 0 0 0 132 20.261V19c0-10.493-8.507-19-19-19H85Zm37 19a9 9 0 0 0-9-9H85a9 9 0 1 0 0 18h28a9 9 0 0 0 9-8.93V19Z" clip-rule="evenodd"></path><path fill="#283841" d="M176 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path></svg>
                </div>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
                    Welcome to your Trading Platform ! 🚀
                </h2>
                    <h3 className='mt-6 text-center text-2xl font-bold text-gray-600'>
                        All you need to do is to register to start trading
                    </h3>
                <br />
            </div>

            <div className="flex flex-col flex-1 items-center justify-center min-h-screen sm:w-">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your account
                    </h2>
                    <RegisterForm />
                </div>
            </div>

        </div>
    )
};

export default Register;