import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getUserProfile, login as loginService, register as registerService } from '../services/AuthService';
import { User } from '../models/User';

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const login = async (email: string, password: string) => {
    const userData = await loginService(email, password);
    setUser(userData.user);
  };

  const register = async (email: string, password: string) => {
    const userData = await registerService(email, password);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;

};
