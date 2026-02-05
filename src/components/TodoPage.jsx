import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';
import useApi from '../hooks/useApi';
import '../App.css';

/**
 * Page des todos - Affiche toute l'interface de gestion des todos
 * Combine: TodoForm, TodoList, TodoFilter, TodoStats
 */
function TodoPage() {
  // Hook custom pour gérer les todos avec le token JWT
  const { todos, loading, error, ajouterTodo, toggleTodo, supprimerTodo, editerTodo, toutSupprimer } = useApi();

  // State pour le filtre actif
  const [filtre, setFiltre] = useState('toutes');

  // Filtre les todos selon le filtre actif
  const filtrerTodos = () => {
    switch (filtre) {
      case 'actives':
        return todos.filter(todo => !todo.completed);
      case 'terminees':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  // Supprime tout avec confirmation
  const handleToutSupprimer = () => {
    if (window.confirm('Supprimer toutes les taches ?')) {
      toutSupprimer();
    }
  };

  if (loading) return <p className="loading">Chargement des todos...</p>;
  if (error) return <p className="error">Erreur : {error.message}</p>;

  return (
    <div className="app-container">
      <h1>Ma TodoList</h1>

      {/* Formulaire d'ajout */}
      <TodoForm onAjouter={ajouterTodo} />

      {/* Statistiques */}
      <TodoStats todos={todos} />

      {/* Filtres */}
      <TodoFilter filtre={filtre} setFiltre={setFiltre} />

      {/* Liste des todos filtres */}
      <TodoList
        todos={filtrerTodos()}
        onToggle={toggleTodo}
        onSupprimer={supprimerTodo}
        onEditer={editerTodo}
      />

      {/* Bouton tout supprimer */}
      {todos.length > 0 && (
        <button onClick={handleToutSupprimer} className="btn-tout-supprimer">
          Tout supprimer
        </button>
      )}
    </div>
  );
}

export default TodoPage;
