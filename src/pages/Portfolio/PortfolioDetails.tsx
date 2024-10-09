import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { fetchTransactions, addTransaction, fetchTotalValues, fetchPortfolio } from '../../services/PortfolioService';
import { Transaction } from '../../types/Transaction';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '../../components/molecules/Tabs';
import StockTable from '../../components/organisms/StockTable';
import TransactionsTable from '../../components/organisms/TransactionsTable';
import LoadingSpinner from '../../components/atoms/LoadingSpinner';
import AddTransactionForm from '../../components/organisms/AddTransactionForm';
import Button from '../../components/atoms/Button';
import GenericModal from '../../components/organisms/GenericModal';
import { TransactionDTO } from '../../dtos/TransactionDTO';
import { Portfolio } from '../../types/Portfolio';
import { Asset } from '../../types/Asset';
import { formatCurrency, formatPercentage } from '../../utils/format';

const PortfolioDetails: React.FC = () => {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Holdings');
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [totalInvestment, setTotalInvestment] = useState<string>('');
  const [totalValue, setTotalValue] = useState<string>('');
  const [returnPercentage, setReturnPercentage] = useState<string>('');

  useEffect(() => {
    // console.log('Portfolio ID:', portfolioId);

    const loadPortfolio = async () => {
      try {
        const portfolioData = await fetchPortfolio(portfolioId || '');
        console.log('Loaded Portfolio Data:', portfolioData);
        setPortfolio(portfolioData || null);
        setLoading(false);
      } catch (error) {
        console.error('Error loading portfolio:', error);
      }
    };

    if (portfolioId) {
      loadPortfolio();
    }
  }, [portfolioId]);

  useEffect(() => {
    const loadTransactions = async () => {
      if (portfolio) {
        console.log('Loading transactions for portfolio:', portfolio);
        try {
          const portfolioTransactions = await fetchTransactions(portfolio.id ? String(portfolio.id) : '');
          setTransactions(portfolioTransactions);
          setLoading(false);
        } catch (error) {
          console.error('Error loading transactions:', error);
        }
      }
    };

    if (portfolio) {
      loadTransactions();
    }
  }, [portfolio]);

  useEffect(() => {
    const loadTotalValues = async () => {
      if (portfolio) {
        try {
          const totalValues = await fetchTotalValues(portfolio.id ? String(portfolio.id) : '');
          setTotalInvestment(formatCurrency(totalValues.total_investment));
          setTotalValue(formatCurrency(totalValues.total_value));
          setReturnPercentage(formatPercentage(totalValues.return_percentage));
        } catch (error) {
          console.error('Error loading total values:', error);
        }
      }
    };

    if (portfolio) {
      loadTotalValues();
    }
  }, [portfolio]);

  const handleTransactionAdded = async (newTransactionDTO: TransactionDTO) => {
    if (!portfolio) {
      return;
    }

    try {
      const transactionsData = await fetchTransactions(portfolio?.id ? String(portfolio.id) : '');
      setTransactions(transactionsData);

      // Reload the portfolio to update the holdings
      const updatedPortfolio = await fetchPortfolio(portfolio.id ? String(portfolio.id) : '');
      setPortfolio(updatedPortfolio || null);

    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleEditStock = (stock: Asset) => {
      console.log('Edit stock:', stock);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

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
            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-8 mt-6">
                Portfolio Overview
              </h2>
                <div className='grid grid-cols-3'>
                <div className='flex flex-col mb-4'>
                  <span className='text-2xl text-dark-gunmetal font-black'>
                    {totalInvestment}
                  </span>
                  <span className='font-semibold text-gray-600'>
                    Total Investment
                  </span>
                </div>
                <div className='flex flex-col mb-4'>
                  <span className='text-2xl text-dark-gunmetal font-black'>
                    {totalValue}
                  </span>
                  <span className='font-semibold text-gray-600'>
                    Total Value
                  </span>
                </div>
                <div className='flex flex-col mb-4'>
                  <span className={`text-${returnPercentage.startsWith('+') ? 'global-color-secondary' : 'red'} text-2xl font-black`}>
                    {returnPercentage}
                  </span>
                  <span className='font-semibold text-gray-600'>
                  Return
                  {/*  */}
                  </span>
                </div>
              </div>
              
            </section>

            <section className="mb-8">
              <header className='flex justify-between'>
                <div className="flex justify-start items-center mb-4">
                  <h2 className="text-2xl font-semibold">Holdings</h2>
                  <div className="bg-global-color-primary text-dark-gunmetal rounded-full ml-4 px-3 py-1">
                    {portfolio.assets ? portfolio.assets.length : 0}
                  </div>
                </div>
                <Button
                  type='button'
                  label='Add Transaction'
                  onClick={() => {
                    setModalContent(
                      <AddTransactionForm
                        onTransactionAdded={handleTransactionAdded}
                        onClosed={() => setIsModalOpen(false)}
                        portfolioId={portfolio.id ? String(portfolio.id) : ''}
                        />
                    );
                    setIsModalOpen(true);
                  }}
                />
              </header>
              
              <StockTable
                stocks={
                  portfolio.assets
                    ? portfolio.assets.map((stock: any) => ({
                        id: stock.id,
                        name: stock.name,
                        symbol: stock.symbol,
                        shares: stock.shares,
                        allocation: stock.shares,
                        purchasePrice: stock.purchase_price,
                        currency: stock.currency,
                        portfolioId: stock.portfolioId,
                        userId: stock.userId,
                        logo: '',
                      }))
                    : []
                }
                onEdit={handleEditStock}
              />
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
              <TransactionsTable transactions={transactions} />
            </section>
          </TabPanel>

          <TabPanel active={activeTab === 'Analysis'}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-500">
              Analysis Coming Soon 🚀
            </h2>
          </TabPanel>

          <TabPanel active={activeTab === 'Dividends'}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-500">
              Dividends Coming Soon 🚀
            </h2>
          </TabPanel>
        </TabsBody>
      </Tabs>

      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpen={() => setIsModalOpen(true)}
        title='Add Transaction'
      >
        {modalContent}
      </GenericModal>

    </div>
  );
};

export default PortfolioDetails;
