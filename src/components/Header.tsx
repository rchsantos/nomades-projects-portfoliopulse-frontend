import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth(); // Récupère l'utilisateur connecté et la fonction logout depuis le contexte
  
    return (
      <header className="bg-dark-gunmetal p-4 text-white">
        <div className='container mx-auto px-6 py-2 lg:px-8'>
          <nav className='flex flex-row px-6 lg:px-8 justify-between'>
            <a href="https://flowbite.com" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <div className="flex flex-wrap items-center max-w-screen-xl"> 
                <div className="space-x-4 flex items-center lg:order-2">
                  <Link
                    to="/login"
                    className="text-global-color-secondary py-2 px-4 rounded"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="bg-global-color-secondary hover:bg-global-color-primary text-black py-2 px-4 rounded focus:ring-4"
                  >
                    Inscription
                  </Link>
                </div>
            </div>
          </nav>
        </div>
      </header>
    );
  };

  export default Header;