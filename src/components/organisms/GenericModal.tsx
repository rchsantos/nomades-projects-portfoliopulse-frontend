import React from 'react';

interface GenericModalProps {
  // id: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  title: string;
  children: React.ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({ isOpen, onClose, onOpen, title, children }) => {
  if (!isOpen) return null;
  // if (!id) return null;

  return (
    <div
    className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center modal bg-dark-gunmetal bg-opacity-20" 
    aria-labelledby="modal-title" 
    role="dialog" 
    aria-modal="true">
      <div className='bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-6" modal-content'>
        <div className='p-4 flex justify-between items-center border-b pb-3 modal-header'>
          <h2 className='text-xl font-semibold modal-title'>{title}</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700 modal-close' aria-label='Close Modal'>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div className='mt-4 modal-body text-left'>
          {children}
        </div>
        {/* TODO: Add a footer to the modal */}
        {/* <div className='mt-4 flex justify-end modal-footer'></div> */}
      </div>
    </div>
  );
};

export default GenericModal;