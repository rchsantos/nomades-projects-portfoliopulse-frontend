import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth(); // Récupère l'utilisateur connecté et la fonction logout depuis le contexte
  
    return (
      <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">PortfolioPulse</h1>
  
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Bienvenue, {user.name}!</span>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Inscription
              </Link>
            </div>
          )}
        </nav>
      </header>
    );
  };

  export default Header;