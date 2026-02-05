import useLocalStorage from './useLocalStorage';

/**
 * Hook pour gérer les todos (CRUD)
 * Utilise useLocalStorage pour la persistance
 */
function useTodos() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  // Ajoute un nouveau todo
  const ajouterTodo = (texte) => {
    const nouveauTodo = {
      id: Date.now(),
      texte: texte,
      completed: false
    };
    setTodos([...todos, nouveauTodo]);
  };

  // Toggle le statut completed
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Supprime un todo
  const supprimerTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Modifie le texte d'un todo
  const editerTodo = (id, nouveauTexte) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, texte: nouveauTexte } : todo
    ));
  };

  // Supprime tous les todos
  const toutSupprimer = () => {
    setTodos([]);
  };

  return {
    todos,
    ajouterTodo,
    toggleTodo,
    supprimerTodo,
    editerTodo,
    toutSupprimer
  };
}

export default useTodos;
