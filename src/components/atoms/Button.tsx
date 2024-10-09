import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type: 'button' | 'submit';
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', className, children }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 bg-global-color-primary hover:bg-global-color-secondary hover:text-white rounded-md ${className}`}
  >
    { label }
    { children }
  </button>
);

export default Button;