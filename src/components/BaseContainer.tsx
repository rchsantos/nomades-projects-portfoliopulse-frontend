import React from 'react';

interface BaseContainerProps {
    children: React.ReactNode;
    maxWidth?: string;
}

const BaseContainer: React.FC<BaseContainerProps> = ({ children, maxWidth = 'max-w-7xl' }) => {
    return (
        <div className={`container mx-auto px-4 ${maxWidth}`}>
            <div className='grid grid-cols-12 gap-4'>
                { children }
            </div>
        </div>
    )
};

export default BaseContainer;