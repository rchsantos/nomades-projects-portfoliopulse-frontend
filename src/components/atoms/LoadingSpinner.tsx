import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-blue-500" />
    </div>
  );
};

export default LoadingSpinner;