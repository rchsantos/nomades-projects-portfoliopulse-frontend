import { Button } from '@headlessui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    // Check if the user is logged in and update the state accordingly
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the user data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  
  return (
    <header className="bg-dark-gunmetal p-4 text-white">
      <div className='container mx-auto px-6 py-2 lg:px-8'>
        <nav className='flex flex-row lg:px-8 justify-between'>
          <a href="/" className="flex items-center">
            <div className='h-4 mr-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 176 40"><path fill="#00FFC4" fillRule="evenodd" d="M15 28a5 5 0 0 1-5-5V0H0v23c0 8.284 6.716 15 15 15h11V28H15ZM45 10a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-19 9C26 8.507 34.507 0 45 0s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM153 10a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9Zm-19 9c0-10.493 8.507-19 19-19s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM85 0C74.507 0 66 8.507 66 19s8.507 19 19 19h28c1.969 0 3.868-.3 5.654-.856L124 40l5.768-10.804A19.007 19.007 0 0 0 132 20.261V19c0-10.493-8.507-19-19-19H85Zm37 19a9 9 0 0 0-9-9H85a9 9 0 1 0 0 18h28a9 9 0 0 0 9-8.93V19Z" clipRule="evenodd"></path><path fill="#283841" d="M176 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path></svg>
            </div>
          </a>
          <div className="flex flex-wrap items-center max-w-screen-xl">
            {isLoggedIn ? (
              <div className='space-x-4 flex items-center lg:order-2'>
                <Link to="/portfolio" className="text-global-color-secondary py-2 px-4 rounded">
                  Portfolios
                </Link>
                <Button
                  onClick={handleLogout}
                  className="bg-global-color-secondary hover:bg-global-color-primary font-semibold text-black py-2 px-4 rounded focus:ring-4">
                    Logout
                  </Button>
              </div>
            ) : (
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
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};  

export default Header;