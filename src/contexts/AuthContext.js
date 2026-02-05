import { createContext } from 'react';

/**
 * Contexte d'authentification global
 * Séparé pour éviter les warnings Fast Refresh
 */
export const AuthContext = createContext(null);
