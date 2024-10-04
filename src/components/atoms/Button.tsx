import React from 'react';
import { Button as HeadlessButton } from '@headlessui/react';

interface ButtonProps {
  onClick: () => void;
  classProps: string; 
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ classProps, onClick, children }) => (
  <HeadlessButton 
    className={classProps}
    onClick={onClick}
  >
    {children}
  </HeadlessButton>
);

export default Button;