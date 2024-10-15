import React from 'react';

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-gunmetal p-6 text-center text-white w-full">
      <div className="container mx-auto">
        <p className="text-sm">&copy; {year} PortfolioPulse. All rights reserved.</p>
        <ul className="flex justify-center space-x-4 mt-4">
          <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
          <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
          <li><a href="/contact" className="hover:underline">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;