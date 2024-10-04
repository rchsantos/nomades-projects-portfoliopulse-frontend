import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow text-white">
        <section className="flex flex-col items-center justify-center py-20 bg-dark-gunmetal">
          <h1 className="text-7xl font-extrabold">
            <span className="bg-gradient-to-r from-global-color-primary to-global-color-secondary text-transparent bg-clip-text">
              Simple and Powerful
            </span>
          </h1>
          <h2 className="text-4xl font-extrabold text-white">
            portfolio tracker
          </h2>
        </section>

        <div className='flex flex-col justify-center items-center p-20'>
          <section className="flex flex-wrap items-center justify-center p-10 bg-white">
            <div className="max-w-md mx-4">
              <h3 className="text-2xl font-bold mb-4 text-neutral-strongest">Welcome to PortfolioPulse</h3>
              <p className="text-base text-neutral-strongest">The best way to track your investments and analyze your portfolio performance.</p>
            </div>

            <div className="max-w-md mx-4">
              <h3 className="text-2xl font-bold mb-4 text-neutral-strongest">Get Started</h3>
              <p className="text-base text-neutral-strongest">Sign up today to start tracking your investments and making informed decisions.</p>
            </div>
          </section>

          <section className="flex flex-wrap items-center justify-center p-10 bg-white">
            {/* Add sections for features or portfolio insights */}
            <div className="max-w-md mx-4">
              <h3 className="text-2xl font-bold mb-4 text-neutral-strongest">Track Your Investments</h3>
              <p className="text-base text-neutral-strongest">Easily track all your portfolios in one place, with real-time data and insights to guide your strategy.</p>
            </div>

            <div className="max-w-md mx-4">
              <h3 className="text-2xl font-bold mb-4 text-neutral-strongest">Analyze Performance</h3>
              <p className="text-base text-neutral-strongest">Deep dive into the performance of each asset, understand trends, and make informed decisions.</p>
            </div>
          </section>
          <section className='flex flex-wrap items-center justify-center p-10 bg-white'>
            <button className="mt-6 bg-global-color-primary hover:bg-global-color-secondary text-black font-bold py-2 px-6 rounded">
              Get Started
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;