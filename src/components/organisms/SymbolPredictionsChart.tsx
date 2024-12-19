import React, { useEffect, useState } from 'react';
// @ts-ignore
import Plot from 'react-plotly.js';
import { fetchPredictionBySymbol } from "../../services/PredctionService";

interface SymbolPredictionsChartProps {
  selectedAction?: string | null;
  selectionPeriod?: number;
}

const SymbolPredictionsChart: React.FC<SymbolPredictionsChartProps> = ({
                                                                         selectedAction,
                                                                         selectionPeriod
                                                                       }) => {
  const [predictions, setPredictions] = useState<{ predicatedPrices: number[], predictedDates: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch predictions via API
    const fetchPredictions = async () => {

      if (!selectedAction) return;

      setIsLoading(true);
      setError(null);

      try {
        // Api call
        const response = await fetchPredictionBySymbol(
          selectedAction,
          selectionPeriod
        );

        console.log(`#### Prediction Period : ${response} ####`);

        if (response) {
          setPredictions({
            predictedDates: response.predicated_dates,
            predicatedPrices: response.predicated_prices
          });
        } else {
          setPredictions(null);
          setError('No prediction data available for the selected action.');
        }

      } catch (err) {
        console.error('Error fetching predictions:', err);
        setError('Failed to fetch prediction data.');
        setPredictions(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [selectedAction, selectionPeriod]);

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading predictions...</div>;
  }

  if (error) {
    return <div className="text-center text-vibrant-red">{error}</div>;
  }

  if (!predictions || Object.keys(predictions).length === 0) {
    return <div className="text-center text-gray-500">No predictions found for this portfolio.</div>;
  }

  // Preparing data for Plotly
  const plotData = [
    {
      x: predictions.predictedDates,
      y: predictions.predicatedPrices,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: '#ab63fa' },
      name: selectedAction,
    },
  ];

  return (
    <div className="w-full mb-16 flex flex-col items-left">
      <h2 className="text-2xl font-semibold mb-4">
        Predictions for {selectedAction} - Next {selectionPeriod} Days
      </h2>
      <Plot
        data={plotData}
        layout={{
          title: `Predicted Prices for ${selectedAction}`,
          xaxis: { title: `Period's Dates`, type: 'category' },
          yaxis: { title: 'Predicted Price (USD)', type: 'linear' },
          autosize: true,
        }}
        style={{ width: '100%', height: '500px' }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default SymbolPredictionsChart;