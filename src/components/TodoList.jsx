import TodoItem from './TodoItem';

/**
 * Liste des todos
 * Props: todos, onToggle, onSupprimer, onEditer
 */
function TodoList({ todos, onToggle, onSupprimer, onEditer }) {
  // Message si liste vide
  if (todos.length === 0) {
    return <p className="liste-vide">Aucune tache a afficher</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onSupprimer={onSupprimer}
          onEditer={onEditer}
        />
      ))}
    </ul>
  );
}

export default TodoList;
