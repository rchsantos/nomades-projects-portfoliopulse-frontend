import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import BaseContainer from '../components/BaseContainer';

const Login: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = React.useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            setError('Email ou mot de passe incorrect');
        }
    };

    return (
        <BaseContainer>
            <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 mx-auto bg-white p-8 rounded shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>
                
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
                    id="email"
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
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Se connecter
                </button>
                </form>
            </div>
        </BaseContainer>
    );
};

export default Login;