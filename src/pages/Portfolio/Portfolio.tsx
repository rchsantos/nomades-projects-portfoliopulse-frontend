import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { getPortfolios, Portfolio } from '../../services/PortfolioService';

// Components : Atoms
import Button from '../../components/atoms/Button';
// import Select from '../../components/atoms/Select';

// Components : Organisms
import GenericModal from '../../components/organisms/GenericModal';
import AddPortfolio from '../../components/organisms/AddPortfolioForm';

import PortfolioTable from '../../components/organisms/PortfolioTable';

const Portfolios: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  const handlePortfolioAdded = async () => {
    const updatedPortfolios = await getPortfolios(localStorage.getItem('userId') || '');
    setPortfolios(updatedPortfolios);
  }

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const data: Portfolio[] = await getPortfolios(userId || '');
        console.log(data);
        setPortfolios(data);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <div className='container mx-auto, px-4 py-6'>

      {/* Header */}
      <header className='flex justify-between items-center mb-8'>
        <h1 className="text-3xl font-bold text-dark-gunmetal mb-4">
          Portfolio Management
        </h1>
        <Button
          type='button'
          label='Add My Portfolio'
          className='bg-global-color-primary text-dark-gunmetal py-2 px-4 rounded'
          onClick={() => {
            setModalContent(
              <AddPortfolio
                onPortfolioAdded={handlePortfolioAdded}
                onClosed={() => setIsModalOpen(false)}
              />
            );
            setIsModalOpen(true);
          }}
        />
      </header>
      {/* <AddPortfolio /> */}

      {/* If no portfolios founded a sample message for create one */}
      {portfolios.length === 0 && (
        <div className='p-4 rounded text-center'>
          <p className='text-dark-gunmetal'>
            You don't have any portfolios yet. Click the button above to add one.
          </p>
        </div>
      )}

      <PortfolioTable portfolios={portfolios} />

      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpen={() => setIsModalOpen(true)}
        title='Portfolio Details'
      >
        {modalContent}
      </GenericModal>
    </div>
  );
};

export default Portfolios;