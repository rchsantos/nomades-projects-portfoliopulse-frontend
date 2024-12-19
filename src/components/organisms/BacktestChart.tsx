import React, { useEffect, useState } from 'react';
// @ts-ignore
import Plot from 'react-plotly.js';
import { fetchBacktestData } from "../../services/PortfolioService";
import Select, { Option } from "../atoms/Select";

const BacktestChart: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [years, setYears] = useState<number>(5);
  const [indices, setIndices] = useState<Option[]>([{ id: '^SSMI', name: '^SSMI' }]);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const availableIndices: Option[] = [
    { id: '^GSPC', name: '^GSPC' },
    { id: '^IXIC', name: '^IXIC' },
    { id: '^DJI', name: '^DJI' },
    { id: '^FTSE', name: '^FTSE' },
    { id: '^SSMI', name: '^SSMI' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchBacktestData(
          initialAmount,
          years,
          indices.map(index => index.id)
        );
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
  }, [initialAmount, years, indices]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
  };

  return (
    <div className="w-full mb-16 flex flex-col items-left">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="flex items-center space-x-4 mb-8">
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <label
            htmlFor="initialAmount"
            className="self-start text-sm font-medium leading-6 text-gray-900">
            Initial Amount:
            <input
              id="initialAmount"
              name="initialAmount"
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </label>

          <label
            htmlFor="years"
            className="self-start text-sm font-medium leading-6 text-gray-900">
            Number of Years:
            <input
              id="years"
              name="years"
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </label>

          <label
            htmlFor="indices"
            className="self-start text-sm font-medium leading-6 text-gray-900"
          >
            Indices:
            <Select
              headerLabel="Select Indices"
              multiple // Active le mode multiple
              value={indices} // Passe le tableau d'indices sélectionnés
              onChange={(selectedOptions) => {
                setIndices(Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]); // Force un tableau
              }}
              options={availableIndices}
            />
          </label>
          <button type="submit">Run Backtest</button>
        </form>
      </div>

      {chartData ? (
        <Plot
          data={[
            {
              x: chartData.dates,
              y: chartData.portfolio_values,
              type: "scatter",
              mode: "lines",
              name: "Portfolio"
            },
            ...Object.keys(chartData.indices_values).map((index) => ({
              x: chartData.dates,
              y: chartData.indices_values[index],
              type: "scatter",
              mode: 'lines',
              name: index,
            })),
          ]}
          layout={{
            title: 'Portfolio Backtest',
            xaxis: { title: 'Date' },
            yaxis: { title: 'Value' },
          }}
        />
      ) : (
        <p>Please run the backtest to display the chart.</p>
      )}
    </div>
  );
};

export default BacktestChart;