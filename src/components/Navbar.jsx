import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';
import '../styles/Navbar.css';

/**
 * Barre de navigation
 * Affiche le nom de l'utilisateur et le bouton de déconnexion
 */
function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  // Gérer la déconnexion
  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Titre */}
        <Link to="/" className="navbar-logo">
        TodoApp
        </Link>

        {/* Contenu de la navbar - s'affiche seulement si connecté */}
        {isAuthenticated && (
          <div className="navbar-content">
            <div className="navbar-user">
              <span className="user-greeting">
                Bienvenue, <strong>{user?.name || 'Utilisateur'}</strong>
              </span>
            </div>

            <button 
              onClick={handleLogout} 
              className="btn-logout"
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
