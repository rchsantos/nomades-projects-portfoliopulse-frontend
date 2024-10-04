import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolios, Portfolio as PortfolioInterface } from '../../services/PortfolioService';

// Components
import Button from '../../components/atoms/Button';
import Select from '../../components/atoms/Select';
import PortfolioList from '../../components/organisms/PortfolioList';

const Portfolios: React.FC = () => {
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('All Portfolios');
  const [selectOptions, setSelectOptions] = useState<string[]>(['All Portfolios']);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const portfolios = await getPortfolios();
        setPortfolios(portfolios);
        setLoading(false);

        // Update select options based on fetched portfolios
        const options = ['All Portfolios', ...portfolios.map(p => p.name)];
        setSelectOptions(options);
      } catch (error) {
        console.error('Failed to fetch portfolios:', error);
      }
    }

    fetchPortfolios();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Select
          headerLabel=''
          options={selectOptions}
          value={selectedOption}
          onChange={setSelectedOption}
        />
        <Button 
          classProps={`bg-global-color-primary hover:bg-global-color-secondary font-semibold text-black py-2 px-4 rounded focus:ring-4`}
          onClick={() => console.log('Button to create a new portfolio is clicked...')}>
          Create Portfolio
        </Button>
      </div>

      {/* Empty Section for Future Graphs */}
      <div className="mb-8">
        {/* Future content: Performance vs Market graph and Portfolio Snowflake */}
      </div>

      {/* Portfolio Cards Section */}
      <PortfolioList loading={loading} portfolios={portfolios} />
    </div>
  );
};

export default Portfolios;