import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';

/**
 * Composant de protection des routes
 * Redirige vers /login si l'utilisateur n'est pas authentifié
 * @param {object} props - { element }
 */
function PrivateRoute({ element }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Chargement...</p>
      </div>
    );
  }

  // Rediriger vers login si pas authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Afficher le composant protégé
  return element;
}

export default PrivateRoute;
