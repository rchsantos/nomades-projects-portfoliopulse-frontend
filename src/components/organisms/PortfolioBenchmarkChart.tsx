import React from 'react';
// @ts-ignore
import Plot from 'react-plotly.js';

interface PortfolioBenchmarkChartProps {
  portfolioReturn: number; // Portfolio performance (e.g., 0.25 for 25%)
  benchmarkReturn: number; // Benchmark performance (e.g., 0.18 for 18%)
}

const PortfolioBenchmarkChart: React.FC<PortfolioBenchmarkChartProps> = ({
                                                                           portfolioReturn,
                                                                           benchmarkReturn
                                                                         }) => {
  const data = [
    {
      x: ["Portfolio", "Benchmark"], // Categories: Portfolio vs Benchmark
      y: [portfolioReturn * 100, benchmarkReturn * 100], // Values in percentages
      type: "bar", // Bar chart
      marker: {
        color: ["#4CAF50", "#FF9800"] // Custom colors
      }
    }
  ];

  const layout = {
    title: "Portfolio vs Benchmark Performance",
    xaxis: {
      title: "Category"
    },
    yaxis: {
      title: "Performance (%)",
      tickformat: ",.2f" // Format: two decimal points
    },
    height: 400
  };

  return <Plot data={data} layout={layout} />;
};

export default PortfolioBenchmarkChart;
