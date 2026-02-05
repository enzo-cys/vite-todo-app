import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import TodoPage from './components/TodoPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

/**
 * Composant App principal
 * Configure les routes et le contexte d'authentification
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Barre de navigation */}
        <Navbar />

        {/* Routes de l'application */}
        <Routes>
          {/* Route de connexion */}
          <Route path="/login" element={<Login />} />

          {/* Route d'inscription */}
          <Route path="/register" element={<Register />} />

          {/* Route protégée : TodoPage */}
          <Route
            path="/"
            element={<PrivateRoute element={<TodoPage />} />}
          />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

