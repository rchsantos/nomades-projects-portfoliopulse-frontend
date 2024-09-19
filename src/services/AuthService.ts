import { User } from '../models/User';

// URL de base of API getted from .env
const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

export interface LoginResponse {
  token: string;
  user: User;
}

// Fonction pour la connexion
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
};

// Fonction pour l'inscription
export const register = async (email: string, password: string): Promise<User> => {
  const response = await fetch(`${BASE_URL_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();
  return data.user;
};

// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async (): Promise<User> => {
  const response = await fetch(`${BASE_URL_API}/auth/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  const data = await response.json();
  return data;
};
