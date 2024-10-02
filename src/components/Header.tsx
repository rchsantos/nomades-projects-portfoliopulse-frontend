import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  
    return (
      <header className="bg-dark-gunmetal p-4 text-white">
        <div className='container mx-auto px-6 py-2 lg:px-8'>
          <nav className='flex flex-row px-6 lg:px-8 justify-between'>
            <a href="/" className="flex items-center">
              <img className='mx-auto p-3 h-12 w-auto' src='https://logoipsum.com/artwork/317' alt='PortfolioPulse Logo ' />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PortfolioPulse</span>
            </a>
            <div className="flex flex-wrap items-center max-w-screen-xl"> 
                <div className="space-x-4 flex items-center lg:order-2">
                  <Link
                    to="/login"
                    className="text-global-color-secondary py-2 px-4 rounded">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-global-color-secondary hover:bg-global-color-primary font-semibold text-black py-2 px-4 rounded focus:ring-4"
                  >
                    Sign up
                  </Link>
                </div>
            </div>
          </nav>
        </div>
      </header>
    );
  };  

  export default Header;