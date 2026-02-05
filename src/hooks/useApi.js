import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../utils/api';

/**
 * Hook personnalisé pour gérer les todos avec le token JWT
 * Récupère automatiquement le token du contexte d'authentification
 */
function useApi() {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ========== RÉCUPÉRER TOUS LES TODOS (GET) ==========
  const fetchTodos = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await getTodos(token);
      // Transformer les données pour correspondre au format attendu
      setTodos(data.map(todo => ({
        id: todo.id,
        texte: todo.text,
        completed: todo.completed === 1 || todo.completed === true
      })));
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Appel au montage et quand le token change
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // ========== AJOUTER UN TODO (POST) ==========
  const ajouterTodo = async (texte) => {
    try {
      await createTodo(texte, false, token);
      await fetchTodos();
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // ========== BASCULER L'ÉTAT D'UN TODO (PUT) ==========
  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await updateTodo(id, todo.texte, !todo.completed, token);
      await fetchTodos();
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // ========== SUPPRIMER UN TODO (DELETE) ==========
  const supprimerTodo = async (id) => {
    try {
      await deleteTodo(id, token);
      await fetchTodos();
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // ========== ÉDITER LE TEXTE D'UN TODO (PUT) ==========
  const editerTodo = async (id, nouveauTexte) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await updateTodo(id, nouveauTexte, todo.completed, token);
      await fetchTodos();
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // ========== SUPPRIMER TOUS LES TODOS ==========
  const toutSupprimer = async () => {
    try {
      await Promise.all(todos.map(todo => deleteTodo(todo.id, token)));
      await fetchTodos();
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    todos,
    loading,
    error,
    ajouterTodo,
    toggleTodo,
    supprimerTodo,
    editerTodo,
    toutSupprimer,
    refetch: fetchTodos,
  };
}

export default useApi;
