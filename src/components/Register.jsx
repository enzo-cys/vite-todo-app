import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';
import '../styles/Auth.css';

/**
 * Formulaire d'inscription
 * Permet à l'utilisateur de créer un compte avec email + mot de passe + nom
 */
function Register() {
  const navigate = useNavigate();
  const { register, error, clearError, isAuthenticated } = useContext(AuthContext);

  // États du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Validation du formulaire
  const validateForm = () => {
    if (!email || !password || !confirmPassword || !name) {
      setLocalError('Veuillez remplir tous les champs');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError('Email invalide');
      return false;
    }

    if (password.length < 6) {
      setLocalError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    if (password !== confirmPassword) {
      setLocalError('Les mots de passe ne correspondent pas');
      return false;
    }

    if (name.trim().length < 2) {
      setLocalError('Le nom doit contenir au moins 2 caractères');
      return false;
    }

    return true;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');
    clearError();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Appeler la fonction register du contexte
      await register(email, password, name);

      // Afficher un message de succès et rediriger vers login
      setSuccess('Inscription réussie ! Vous pouvez vous connecter.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      // L'erreur est déjà dans le contexte, mais on la met aussi localement
      setLocalError(err.message || 'Erreur d\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">S'inscrire</h1>

        {/* Afficher les erreurs */}
        {(localError || error) && (
          <div className="error-message">
            {localError || error}
          </div>
        )}

        {/* Afficher le message de succès */}
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Nom */}
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

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
              placeholder="Minimum 6 caractères"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Confirmer mot de passe */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Bouton d'inscription */}
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </form>

        {/* Lien vers connexion */}
        <p className="auth-footer">
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="auth-link">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
