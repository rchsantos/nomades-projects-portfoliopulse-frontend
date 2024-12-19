import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import {
  fetchTransactions,
  addTransaction,
  fetchPortfolio,
  fetchPortfolioAnlysis,
  // fetchCurrentPrices,
  comparePortfolioToBenchmark,
} from "../../services/PortfolioService";
import { Transaction } from '../../types/Transaction';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '../../components/molecules/Tabs';
import HoldingTable from '../../components/organisms/HoldingTable';
import TransactionsTable from '../../components/organisms/TransactionsTable';
import LoadingSpinner from '../../components/atoms/LoadingSpinner';
import AddTransactionForm from '../../components/organisms/AddTransactionForm';
import Button from '../../components/atoms/Button';
import GenericModal from '../../components/organisms/GenericModal';
import { TransactionDTO } from '../../dtos/TransactionDTO';
import { Portfolio } from '../../types/Portfolio';
import { Asset } from '../../types/Asset';
import { Holding } from "../../types/Holding";
import { formatCurrency, formatPercentage } from '../../utils/format';
import { fetchAllAssets } from '../../services/AssetService';
import EditTransactionForm from '../../components/organisms/EditTransactionForm';
import SymbolPredictionsChart from '../../components/organisms/SymbolPredictionsChart';
import Select, { Option } from '../../components/atoms/Select';
import PortfolioBenchmarkChart from '../../components/organisms/PortfolioBenchmarkChart';
import PortfolioVsMarketChart from "../../components/organisms/PortfolioVsMarketChart";


// Periods for the predictions
const PERIOD_OPTIONS: Option[] = [
  { id: '7', name: '1 Week' },
  { id: '30', name: '1 Month' },
  { id: '90', name: '3 Months' },
  { id: '180', name: '6 Months' },
  { id: '365', name: '1 Year' },
  { id: '730', name: '2 Years' },
  { id: '1095', name: '3 Years' },
  { id: '1825', name: '5 Years' },
];

const PortfolioDetails: React.FC = () => {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [activeTab, setActiveTab] = useState<string>('Holdings');
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const [investedCapital, setInvestedCapital] = useState<number>(0);
  const [totalCurrentValue, setTotalCurrentValue] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [returnPercentage, setReturnPercentage] = useState<string>('0%');
  
  const [selectedAction, setSelectedAction] = useState<Option | null>(null);
  const [selectionPeriod, setSelectionPeriod] = useState<number>(30);
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>({});

  const [portfolioReturn, setPortfolioReturn] = useState<number>(0);
  const [benchmarkReturn, setBenchmarkReturn] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const portfolioData = await fetchPortfolio(portfolioId || '');
        console.log('Loaded Portfolio Data:', portfolioData);  // @todo: Remove this
        setPortfolio(portfolioData || null);
        setLoading(false);
      } catch (error) {
        console.error('Error loading portfolio:', error);  // @todo: Remove this
      }
    };

    if (portfolioId) {
      loadPortfolio();
    }
  }, [portfolioId]);

  // @TODO: Need to implement the logic to fetch the holdings data
  useEffect(() => {
    const loadHoldings = async () => {
      if (portfolio) {
        try {
          const portfolioAnalysis = await fetchPortfolioAnlysis(portfolio.id ? String(portfolio.id) : '');
          const { total_value, weights } = portfolioAnalysis;
          console.log('Loaded Holdings Data:', weights); // @todo: Remove this
          setHoldings(weights);

          // const currentPrices = await fetchCurrentPrices(weights.map((holding: Holding) => holding.asset.symbol));
          // console.log('Current Prices:', currentPrices);  // @todo: Remove this
          // setCurrentPrices(currentPrices);
          //
          // const totalValueCurrent = weights.reduce((total, holding) => {
          //   return total + (currentPrices[holding.asset.symbol] * holding.quantity);
          // }, 0);
          // console.log('Total Value Current:', totalValueCurrent);  // @todo: Remove this
          // console.log('Total Value:', total_value);  // @todo: Remove this
          //
          // const totalReturnValue = totalValueCurrent - total_value;
          // const returnPercent = total_value > 0 ? ((totalReturnValue / total_value) * 100).toFixed(2) : '0.00';
          // console.log('Return Percent:', returnPercent);  // @todo: Remove this

          setInvestedCapital(total_value);
          // setTotalCurrentValue(totalValueCurrent);
          // setTotalReturn(totalReturnValue);
          // setReturnPercentage(`${returnPercent}%`);
          setHoldings(weights);
          
          setLoading(false);
        } catch (error) {
          console.error('Error loading holdings:', error);  // @todo: Remove this
        }
      }
    }

    if (portfolio) {
      loadHoldings();
    }
    
  }, [portfolio]);
  
  useEffect(() => {
    const loadAssets = async () => {
      if (portfolio) {
        try {
          const assetsData = await fetchAllAssets(portfolio.id ? String(portfolio.id) : '');
          console.log('Loaded Assets Data:', assetsData); // @todo: Remove this
          setAssets(assetsData);
          setLoading(false);
        } catch (error) {
          console.error('Error loading assets:', error);  // @todo: Remove this
        }
      }
    }
    
    if (portfolio) {
      loadAssets();
    }
      
  }, [portfolio]);

  useEffect(() => {
    const loadTransactions = async () => {
      if (portfolio) {
        console.log('Loading transactions for portfolio:', portfolio);
        try {
          const portfolioTransactions = await fetchTransactions(portfolio.id ? String(portfolio.id) : '');
          console.log('Loaded transactions from portfolio:', portfolioTransactions);  // @todo: Remove this
          setTransactions(portfolioTransactions);
          setLoading(false);
          
          console.log('Loaded transactions:', portfolioTransactions);  // @todo: Remove this
        } catch (error) {
          console.error('Error loading transactions:', error);  // @todo: Remove this
        }
      }
    };

    if (portfolio) {
      loadTransactions();
    }
  }, [portfolio]);

  interface PortfolioCompareResponse {
    total_value: number;
    total_investment: number;
    total_return: number;
    benchmark_return: number;
    outperforming: boolean;
  }
  
  useEffect(() => {
    const fetchComparison = async () => {
      if (!portfolioId) return;

      try {
        setLoading(true);
        const data: PortfolioCompareResponse = await comparePortfolioToBenchmark(
          portfolioId,
          '^SSMI', // Default: Swiss Market Index
          // '1d' // Default interval: daily
        );
        setPortfolioReturn(data.total_return);
        setBenchmarkReturn(data.benchmark_return);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching portfolio comparison:', err);
        setError(err.message || 'Failed to fetch comparison');
        setLoading(false);
      }
    };

    fetchComparison();
  }, [portfolioId]);

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
      console.error('Error adding transaction:', error);  // @todo: Remove this
    }
  };

  const handleTransactionUpdated = async (updatedTransaction: Transaction) => {
    const updatedTransactions = transactions.map(transaction =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setModalContent(
      <EditTransactionForm
        transaction={transaction}
        onTransactionUpdated={handleTransactionUpdated}
        onClosed={() => setIsModalOpen(false)}
      />
    );
    setIsModalOpen(true);
  };
  
  // Load the stock data from the API
  const loadStockData = async (id: string) => {
    try {
      
    } catch (error) {
      console.error('Error loading stock data:', error);  // @todo: Remove this
    }
  }

  const handleActionSelection = (value: Option | Option[]) => {
    if (!Array.isArray(value)) {
      setSelectedAction(value);
    }
  };

  const handlePeriodSelection = (value: Option | Option[]) => {
    if (!Array.isArray(value)) {
      setSelectionPeriod(Number(value.id));
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark-gunmetal">
          {portfolio?.name}
        </h1>
        <div className="flex flex-row justify-between items-center text-global-color-secondary hover:underline">
          <FontAwesomeIcon icon={faArrowLeftLong} />
          <Link
            to="/portfolio"
            className="ml-2"
          >
            Back to Portfolios
          </Link>
        </div>
      </header>

      <Tabs>
        <TabsHeader>
          {["Holdings", "Analysis", "Dividends", "Insights", "Watchlists", "Screeners", "AI Analysis Portfolio"].map((tab) => (
            <Tab
              key={tab}
              title={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </TabsHeader>

        <TabsBody>
          <TabPanel active={activeTab === "Holdings"}>
            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-8 mt-6">
                Portfolio Overview
              </h2>
              <div className="grid grid-cols-3">
                <div className="flex flex-col mb-4">
                  <span className="text-2xl text-dark-gunmetal font-black">
                    {Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF" }).format(investedCapital)}
                  </span>
                  <span className="font-semibold text-gray-600">
                  Invested Capital
                  </span>
                </div>
                <div className="flex flex-col mb-4">
                  <span
                    className={`text-${totalReturn >= 0 ? "global-color-secondary" : "ruby-red"} text-2xl font-black`}>
                    {Intl.NumberFormat("de-CH", {
                      style: "currency",
                      currency: "CHF"
                    }).format(totalReturn)} ({returnPercentage})
                  </span>
                  <span className="font-semibold text-gray-600">
                  Return
                    {/*  */}
                  </span>
                </div>
              </div>

            </section>

            <section className="mb-8">
              <header className="flex justify-between">
                <div className="flex justify-start items-center mb-4">
                  <h2 className="text-2xl font-semibold">Holdings</h2>
                  <div className="bg-global-color-primary text-dark-gunmetal rounded-full ml-4 px-3 py-1">
                    {holdings ? holdings.length : 0}
                  </div>
                </div>
                <Button
                  type="button"
                  label="Add Transaction"
                  onClick={() => {
                    setModalContent(
                      <AddTransactionForm
                        onTransactionAdded={handleTransactionAdded}
                        onClosed={() => setIsModalOpen(false)}
                        portfolioId={portfolio.id ? String(portfolio.id) : ""}
                      />
                    );
                    setIsModalOpen(true);
                  }}
                />
              </header>

              <HoldingTable
                holdings={holdings}
              />
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
              <TransactionsTable
                transactions={transactions}
                onEdit={handleEditTransaction}
              />
              <GenericModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onOpen={() => setIsModalOpen(true)}
                title="Add Transaction"
              >
                {modalContent}
              </GenericModal>
            </section>
          </TabPanel>

          <TabPanel active={activeTab === "Analysis"}>
            {/*<h2 className="text-2xl font-semibold mb-4 text-gray-500">*/}
            {/*  Analysis Coming Soon 🚀*/}
            {/*</h2>*/}
            <div className="flex flex-col items-left space-x-4 mb-4">
              <h1 className="text-2xl font-bold mb-4">Portfolio vs Benchmark</h1>
              
              {portfolioId && (
                <PortfolioVsMarketChart
                  portfolioId={portfolioId}
                />
              )}
              
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <Select
                headerLabel="Select an Action"
                options={holdings.map((holding) => ({
                  id: holding.asset.symbol,
                  name: holding.asset.symbol
                }))}
                value={selectedAction}
                onChange={handleActionSelection}
                className="w-1/3"
              />
              <Select
                headerLabel="Select a Period"
                options={PERIOD_OPTIONS}
                value={PERIOD_OPTIONS.find((opt) => Number(opt.id) === selectionPeriod) || null}
                onChange={handlePeriodSelection}
                className="w-1/3"
              />
            </div>
            {selectedAction && (
              <SymbolPredictionsChart
                selectedAction={selectedAction.id}
                selectionPeriod={selectionPeriod}
              />
            )}
          </TabPanel>

          <TabPanel active={activeTab === "Dividends"}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-500">
              Dividends Coming Soon 🚀
            </h2>
          </TabPanel>
          <TabPanel active={activeTab === "Insights"}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-500">
              Insights Coming Soon 🚀
            </h2>
          </TabPanel>
          <TabPanel active={activeTab === "Watchlists"}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-500">
              Watchlists Coming Soon 🚀
            </h2>
          </TabPanel>
          <TabPanel active={activeTab === 'Screeners'}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-500">
              Screeners Coming Soon 🚀
            </h2>
          </TabPanel>
          <TabPanel active={activeTab === 'AI Analysis Portfolio'}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-500">
              AI Analysis Portfolio Coming Soon 🤖🤖🤖 
            </h2>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default PortfolioDetails;
