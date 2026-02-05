/**
 * Fonctions utilitaires pour les appels API
 * Toutes les requêtes incluent le token JWT si disponible
 */

const API_URL = 'http://localhost:5550/api';

/**
 * Fonction générique pour les requêtes API
 * @param {string} endpoint - L'endpoint (ex: '/todos', '/auth/login')
 * @param {string} method - Méthode HTTP (GET, POST, PUT, DELETE)
 * @param {object} body - Corps de la requête (optionnel)
 * @param {string} token - Token JWT (optionnel)
 * @returns {Promise} Réponse de l'API
 */
async function apiCall(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Ajouter le token JWT s'il existe
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  // Ajouter le corps si présent
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  // Gérer les erreurs
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Erreur API: ${response.status}`);
  }

  return response.json();
}

/**
 * ==================== AUTHENTIFICATION ====================
 */

/**
 * S'inscrire avec email, mot de passe et nom
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @returns {Promise} Retourne { user, token }
 */
export async function register(email, password, name) {
  return apiCall('/auth/register', 'POST', { email, password, name });
}

/**
 * Se connecter avec email et mot de passe
 * @param {string} email
 * @param {string} password
 * @returns {Promise} Retourne { user, token }
 */
export async function login(email, password) {
  return apiCall('/auth/login', 'POST', { email, password });
}

/**
 * ==================== TODOS ====================
 */

/**
 * Récupérer tous les todos de l'utilisateur
 * @param {string} token - Token JWT
 * @returns {Promise} Tableau de todos
 */
export async function getTodos(token) {
  const response = await apiCall('/todos', 'GET', null, token);
  return response.data || [];
}

/**
 * Ajouter un nouveau todo
 * @param {string} text - Texte du todo
 * @param {boolean} completed - État du todo
 * @param {string} token - Token JWT
 * @returns {Promise} Le todo créé
 */
export async function createTodo(text, completed, token) {
  const response = await apiCall('/todos', 'POST', { text, completed }, token);
  return response.data;
}

/**
 * Mettre à jour un todo
 * @param {number} id - ID du todo
 * @param {string} text - Nouveau texte
 * @param {boolean} completed - Nouvel état
 * @param {string} token - Token JWT
 * @returns {Promise} Le todo modifié
 */
export async function updateTodo(id, text, completed, token) {
  const response = await apiCall(`/todos/${id}`, 'PUT', { text, completed }, token);
  return response.data;
}

/**
 * Supprimer un todo
 * @param {number} id - ID du todo
 * @param {string} token - Token JWT
 * @returns {Promise}
 */
export async function deleteTodo(id, token) {
  return apiCall(`/todos/${id}`, 'DELETE', null, token);
}
