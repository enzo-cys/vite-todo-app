import { useState, useCallback } from 'react';
import { login as apiLogin, register as apiRegister } from '../utils/api';
import { AuthContext } from './AuthContext.js';

export function AuthProvider({ children }) {
  // État de l'authentification
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch (err) {
      console.error('Erreur lors du chargement des données stockées:', err);
      localStorage.removeItem('user');
      return null;
    }
  });
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || null;
  });
  const [loading] = useState(false);
  const [error, setError] = useState(null);

  // ========== CONNEXION ==========
  /**
   * Connecter l'utilisateur
   * @param {string} email
   * @param {string} password
   */
  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const data = await apiLogin(email, password);

      // Stocker le token et l'utilisateur
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur de connexion';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // ========== INSCRIPTION ==========
  /**
   * S'inscrire avec email, mot de passe et nom
   * @param {string} email
   * @param {string} password
   * @param {string} name
   */
  const register = useCallback(async (email, password, name) => {
    setError(null);
    try {
      const data = await apiRegister(email, password, name);
      // L'inscription ne retourne pas automatiquement un token
      // L'utilisateur doit se connecter après
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur d\'inscription';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // ========== DÉCONNEXION ==========
  /**
   * Déconnecter l'utilisateur
   */
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  // ========== EFFACER LES ERREURS ==========
  /**
   * Nettoyer l'erreur affichée
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Valeurs du contexte
  const value = {
    // État
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,

    // Fonctions
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

