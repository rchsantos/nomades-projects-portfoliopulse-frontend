import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
// import StockTable, { Stock } from '../../components/organisms/StockTable';
import { Portfolio, fetchTransactions, Transaction } from '../../services/PortfolioService';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '../../components/molecules/Tabs';
import StockTable, { Stock } from '../../components/organisms/StockTable';
import TransactionsTable from '../../components/organisms/TransactionsTable';
import LoadingSpinner from '../../components/atoms/LoadingSpinner';

const PortfolioDetails: React.FC = () => {
  // const { portfolioId } = useParams<{ portfolioId: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Holdings');
  const [loading, setLoading] = useState<boolean>(true);


  // Mock portfolio
  const portfolioData: Portfolio = {
    name: 'Energy Stocks Sector',
    userId: 'user123',
    tickers: ['AAPL', 'GOOGL', 'TSLA'].map(ticker => ({
      id: ticker,
      name: ticker,
      symbol: ticker,
      allocation: 0,
      purchasePrice: 0,
      currency: 'USD',
      portfolioId: '',
      userId: 'user123',
      logo: ''
    })),
    strategy: 'Growth',
    currency: 'USD',
    description: 'A sample portfolio',
  };

  useEffect(() => {
      setPortfolio(portfolioData);

    // const loadPortfolio = async () => {
    //   if (portfolioId) {
    //     const portfolioDetails = await fetchPortfolio(portfolioId);
    //     setPortfolio(portfolioDetails);
    //   } else {
    //     console.error('Portfolio ID is undefined');
    //   }
    // };

    const portfolioId = 'IgmRIFaEnc855pLEtbDX'

    const loadTransactions = async () => {
      if (portfolioId) {
        const portfolioTransactions = await fetchTransactions(portfolioId);
        setTransactions(portfolioTransactions);
        setLoading(false);
      } else {
        console.error('Portfolio ID is undefined');
      }
    };

    // loadPortfolio();
    loadTransactions();
  }, []);

  const handleEditStock = (stock: Stock) => {
    // Handle edit stock action (e.g., open edit modal)
    console.log('Edit stock:', stock);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    // Handle edit transaction action (e.g., open edit modal)
    console.log('Edit transaction:', transaction);
  };
    
  if (loading) {
    return <LoadingSpinner />;
  }


  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  console.log('Portfolio', portfolio);

  // The total value of the portfolio is calculated by the API and this information is displayed in the Portfolio Overview section.
  // TODO: Display the total value of the portfolio in the Portfolio Overview section. HERE

  return (
    <div className='container mx-auto px-4 py-6'>
      <header className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-dark-gunmetal'>
          {portfolio?.name}
        </h1>
        <div className='flex flex-row justify-between items-center text-global-color-secondary hover:underline'>
          <FontAwesomeIcon icon={faArrowLeftLong} />
          <Link
            to='/portfolio'
            className='ml-2'
          >
            Back to Portfolios
          </Link>
        </div>
      </header>

      <Tabs>
        <TabsHeader>
          {['Holdings', 'Analysis', 'Dividends'].map((tab) => (
            <Tab
              key={tab}
              title={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </TabsHeader>

        <TabsBody>
          <TabPanel active={activeTab === 'Holdings'}>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Portfolio Overview</h2>
              <p>Total Value: 20000</p>
            </section>

            <section className="mb-8">
              <div className="flex justify-start items-center mb-4">
                <h2 className="text-2xl font-semibold">Holdings</h2>
                <div className="bg-global-color-primary text-dark-gunmetal rounded-full ml-4 px-3 py-1">
                  {portfolio.tickers ? portfolio.tickers.length : 0}
                </div>
              </div>
              {/* export interface Stock {
                id: string;
                name: string;
                symbol: string;
                allocation: number;
                purchasePrice: number;
                currency: string;
                portfolioId: string;
                userId: string;
                logo: string;
                } */}
              <StockTable stocks={portfolio.tickers ? portfolio.tickers.map(ticker => ({
                id: ticker.id,
                name: ticker.name,
                symbol: ticker.symbol,
                allocation: 0,
                purchasePrice: 0,
                currency: portfolio?.currency || 'USD', 
                portfolioId: portfolio?.userId,
                userId: portfolio.userId,
                logo: ''
              })) : []} onEdit={handleEditStock} />
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
              <TransactionsTable transactions={transactions} />
            </section>
          </TabPanel>

          <TabPanel active={activeTab === 'Analysis'}>
            <h2 className="text-2xl font-semibold mb-4">Analysis</h2>
            {/* Add analysis content here */}
          </TabPanel>

          <TabPanel active={activeTab === 'Dividends'}>
            <h2 className="text-2xl font-semibold mb-4">Dividends</h2>
            {/* Add dividends content here */}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default PortfolioDetails;
