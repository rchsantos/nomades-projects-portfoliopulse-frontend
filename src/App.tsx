// Imports principaux de l'application
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importer les composants
import Header from './components/Header';
// import ProtectedRoutes from './components/ProtectedRoutes';

// Importer les pages
import Home from './pages/Home';

// Importer le contexte
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Bienvenue sur PortfolioPulse</h1>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

// Exporter le composant App
export default App;
