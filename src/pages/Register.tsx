import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import BaseContainer from '../components/BaseContainer';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(email, password);
            navigate('/login');
        } catch (error) {
            console.error( 'Registration failed', error );
        }
    };

    return (
        <BaseContainer>
            <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 mx-auto bg-white p-8 rounded shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Inscription</h1>

                {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                    {error}
                </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}   
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mot de passe
                        </label>
                        <input 
                            type="password"
                            placeholder='Mot de passe'
                            className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                            S'inscrire
                    </button>
                </form>
            </div>
        </BaseContainer>
    )
};

export default Register;