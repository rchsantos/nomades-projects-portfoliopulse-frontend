import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRoutesProps {
    children: JSX.Element;
}

// Ce composant permet de protéger des routes en vérifiant si l'utilisateur est connecté
const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoutes;