import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';
import '../styles/Auth.css';

/**
 * Formulaire de connexion
 * Permet à l'utilisateur de se connecter avec email + mot de passe
 */
function Login() {
  const navigate = useNavigate();
  const { login, error, clearError, isAuthenticated } = useContext(AuthContext);

  // États du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Validation du formulaire
  const validateForm = () => {
    if (!email || !password) {
      setLocalError('Veuillez remplir tous les champs');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError('Email invalide');
      return false;
    }
    return true;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Appeler la fonction login du contexte
      await login(email, password);

      // Rediriger vers la page d'accueil
      navigate('/');
    } catch (err) {
      // L'erreur est déjà dans le contexte, mais on la met aussi localement
      setLocalError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Se Connecter</h1>

        {/* Afficher les erreurs */}
        {(localError || error) && (
          <div className="error-message">
            {localError || error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Bouton de connexion */}
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se Connecter'}
          </button>
        </form>

        {/* Lien vers inscription */}
        <p className="auth-footer">
          Pas encore de compte ?{' '}
          <Link to="/register" className="auth-link">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
