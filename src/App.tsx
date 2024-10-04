// Import the necessary libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

// Import the components
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';

// Import the pages
import HomePage from './pages/Homepage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Portfolios from './pages/Portfolio/Portfolio';
import PortfolioDetails from './pages/Portfolio/PortfolioDetails';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const hideElements = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
        {!hideElements && <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolios />} />
          <Route path="/portfolio/:portfolioId" element={<PortfolioDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {!hideElements && <Footer />}
      </div>
  );
}

// Exporter le composant App
export default App;
