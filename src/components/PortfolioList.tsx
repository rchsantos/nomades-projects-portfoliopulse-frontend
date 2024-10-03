import React, { useState, useEffect } from 'react';
import { getPortfolios, Portfolio } from '../services/PortfolioService';

const PortfolioList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    async function fetchPortfolios() {
      try{
        const portfolios = await getPortfolios();
        setPortfolios(portfolios);
      } catch (error) {
        console.error('Failled to fetch portfolios : ', error);
      }
    }
  

    fetchPortfolios();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h3 className="text-gray-700 text-2xl font-medium">All Portfolios</h3>
      <div className="mt-4">
        <table className="min-w-full table-auto">
          <thead className="justify-between">
            <tr className="bg-gray-800">
              <th className="px-16 py-2">
                <span className="text-gray-300">Name</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-300">Description</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-300">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {portfolios.map((portfolio) => (
              <tr className="bg-white border-b border-gray-200" key={portfolio.id}>
                <td className="px-16 py-2">
                  <span className="text-center ml-2 font-semibold">{portfolio.name}</span>
                </td>
                <td className="px-16 py-2">
                  <span className="text-center ml-2 font-semibold">{portfolio.description}</span>
                </td>
                <td className="px-16 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-blue-500 hover:text-black">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-red-500 hover:text-black">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default PortfolioList;