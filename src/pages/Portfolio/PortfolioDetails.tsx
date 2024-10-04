import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { getPortfolio, getRelatedStocks, Portfolio, Stock } from '../../services/PortfolioService';
import Button from '../../components/atoms/Button';

const PortfolioDetails: React.FC = () => {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        if (portfolioId) {
          const portfolioDetails = await getPortfolio(portfolioId);
          setPortfolio(portfolioDetails);
          const relatedStocks = await getRelatedStocks(portfolioId);
          setStocks(relatedStocks);
          setLoading(false);
        } else {
          console.error('Portfolio ID is undefined');
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio details:', error);
      }
    }

    fetchPortfolio();
  }, [portfolioId]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (!portfolio) {
    return <div className="text-center mt-4">Portfolio not found</div>;
  }

  console.log('Portfolio:', portfolio);
  console.log('Stocks:', stocks);

  return (
    <div className="container mx-auto px-6 py-8 flex flex-col">
      <h1 className="text-2xl font-semibold mb-4 self-start">{portfolio?.name}</h1>
      <TabGroup>
        <TabList className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
        <Tab as={React.Fragment}>
            {({ selected }) => (
              // For the selected tab, we add a border to the bottom with the global color primary
              <button className={`px-4 py-2 ${selected ? 'border-b-4 border-solid border-global-color-primary px-4 py-2' : 'bg-transparent'}`}>
                Holdings
              </button>
            )}
          </Tab>
          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`px-4 py-2 ${selected ? 'border-b-4 border-solid border-global-color-primary px-4 py-2' : 'bg-transparent'}`}
              >
                Analysis
              </button>
            )}
          </Tab>
          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`px-4 py-2 ${selected ? 'border-b-4 border-solid border-global-color-primary px-4 py-2' : 'bg-transparent'}`}
              >
                Dividends
              </button>
            )}
          </Tab>
        </TabList>
        <TabPanels className={'p-10'}>
          <TabPanel>
            <div>
              <section>
                The graphs will be displayed here...
              </section>
              <div>
                <div>
                  <header data-cy-id="holdings-header" className="flex justify-between items-center mb-4">
                    <h2 className="text-xl">
                      Holdings 
                      <span className='m-3 p-2 bg-global-color-primary border-global-color-secondary w-1 rounded-full'> {portfolio?.tickers.length}</span>
                    </h2>

                    <Button
                      classProps={`bg-global-color-primary hover:bg-global-color-secondary font-semibold text-black py-2 px-4 rounded focus:ring-4`}
                      onClick={() => console.log('Button to add a new holding is clicked...')}
                    >
                      Edit
                    </Button>
                  </header>
                
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Symbol</th>
                        <th className="py-2 px-4 border-b">Last Price</th>
                        <th className="py-2 px-4 border-b">Fair Value</th>
                        <th className="py-2 px-4 border-b">7D Return</th>
                        <th className="py-2 px-4 border-b">Total Return</th>
                        <th className="py-2 px-4 border-b">Value & Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stocks.map((stock: Stock) => (
                        <tr key={stock.id}>
                          <td className="py-2 px-4">{stock.symbol}</td>
                        </tr>
                      ))} 
                    </tbody>
                  </table>
              </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <p>Analysis content goes here...</p>
          </TabPanel>
          <TabPanel>
            <p>Dividends content goes here...</p>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div> 
  );
};

export default PortfolioDetails;