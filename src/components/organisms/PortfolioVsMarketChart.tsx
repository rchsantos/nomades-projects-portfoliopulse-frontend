import React, { useEffect, useState } from 'react';
// @ts-ignore
import Plot from 'react-plotly.js';
import { fetchPortfolioVsMarketData } from "../../services/PortfolioService";
import Select, { Option } from '../../components/atoms/Select';

interface PortfolioVsMarketProps {
  portfolioId: string;
}

const PortfolioVsMarketChart: React.FC<PortfolioVsMarketProps> = ({ portfolioId }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [benchmark, setBenchmark] = useState<string>('^SSMI');
  const [interval, setInterval] = useState<string>('1M');

  const BENCHMARK_OPTIONS: Option[] = [
    { id: '^SSMI', name: 'Swiss Market Index (SMI)' },
    { id: '^IXIC', name: 'NASDAQ Composite' },
    { id: '^DJI', name: 'Dow Jones Industrial Average' },
    { id: 'N100', name: 'Euronext 100' },
    { id: '^GSPC', name: 'S&P 500' },
  ];

  const INTERVAL_OPTIONS: Option[] = [
    { id: '7D', name: '7 Days' },
    { id: '1M', name: '1 Month' },
    { id: '3M', name: '3 Months' },
    { id: 'YTD', name: 'Year to Date' },
    { id: '1Y', name: '1 Year' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchPortfolioVsMarketData(portfolioId, benchmark, interval);
        console.log('Response', response);
        setChartData(response);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(
          err.response?.data?.detail ||
          'Failed to fetch data for Portfolio vs Market.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [portfolioId, benchmark, interval]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { historical_data, total_return, benchmark_return, outperforming } = chartData || {};
  const { dates, portfolio_values, benchmark_values } = historical_data || {};
  
  console.log('Chart Data', chartData);
  console.log('Dates', dates);
  console.log('Portfolio Values', portfolio_values);
  console.log('Benchmark Values', benchmark_values);

  console.error('Mismatched data lengths:', {
    dates: dates.length,
    portfolio_values: portfolio_values.length,
    benchmark_values: benchmark_values.length,
  });

  return (
    <div className="w-full mb-16 flex flex-col items-left">
      <div className="flex items-center space-x-4 mb-8">
        <Select
          headerLabel="Select a Benchmark"
          options={BENCHMARK_OPTIONS}
          value={BENCHMARK_OPTIONS.find(opt => opt.id === benchmark) ?? null}
          onChange={(selected) => {
            if (!Array.isArray(selected)) {
              setBenchmark(selected.id);
            }
          }}
        />
        <Select
          headerLabel="Select an Interval"
          options={INTERVAL_OPTIONS}
          value={INTERVAL_OPTIONS.find(opt => opt.id === interval) ?? null}
          onChange={(selected) => {
            if (!Array.isArray(selected)) {
              setInterval(selected.id);
            }
          }}
        />
      </div>

      <div className="w-full mb-16 flex flex-col items-left">
        <p>
          Total Portfolio Return: <strong>{(total_return * 100).toFixed(2)}%</strong>
        </p>
        <p>
          Total Benchmark Return ({benchmark}):{' '}
          <strong>{(benchmark_return * 100).toFixed(2)}%</strong>
        </p>
        <p>
          Is Portfolio Outperforming?{' '}
          <strong>{outperforming ? 'Yes ✅' : 'No ❌'}</strong>
        </p>
      </div>

      <Plot
        data={[
          {
            x: dates, // X-axis: dates
            y: portfolio_values, // Y-axis: Portfolio values
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#ab63fa' },
            name: 'Portfolio',
            yaxis: 'y1', // Utilise le premier axe Y
          },
          {
            x: dates, // X-axis: dates
            y: benchmark_values, // Y-axis: Benchmark values
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#19d3f3' },
            name: benchmark,
            yaxis: 'y2', // Utilise le second axe Y
          },
        ]}
        layout={{
          title: 'Portfolio vs Market',
          xaxis: { title: 'Date' },
          yaxis: { title: 'Portfolio Value', overlaying: 'free', side: 'left' },
          yaxis2: { title: 'Benchmark Value', overlaying: 'y', side: 'right' },
        }}
        style={{ width: '100%', height: '500px' }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default PortfolioVsMarketChart;