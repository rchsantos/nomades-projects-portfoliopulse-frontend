// Import the necessary libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

// Import the components
import Header from './components/Header';

// Import the pages
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
        {!hideHeader && <Header />}
        <Routes>
          <Route path="/" element={<h1>Bienvenue sur PortfolioPulse</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
  );
}

// Exporter le composant App
export default App;
