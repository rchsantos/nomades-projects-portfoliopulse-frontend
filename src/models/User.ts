/**
 * Interface représentant un utilisateur dans l'application.
 */
export interface User {
    id: string;               
    name: string;
    email: string;
    password?: string;
    role?: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
    token?: string; // Jeton d'authentification (JWT ou autre)
  }
  
  /**
   * Interface pour la réponse après l'inscription ou la connexion.
   */
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  /**
   * Interface pour les informations nécessaires lors de l'inscription.
   */
  export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
  }
  
  /**
   * Interface pour les informations nécessaires lors de la connexion.
   */
  export interface LoginUserInput {
    email: string;
    password: string;
  }
  
  /**
   * Interface pour mettre à jour un utilisateur.
   */
  export interface UpdateUserInput {
    name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user';
  }
  