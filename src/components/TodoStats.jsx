/**
 * Affiche les statistiques des todos
 * Props: todos (tableau complet)
 */
function TodoStats({ todos }) {
  const total = todos.length;
  const terminees = todos.filter(t => t.completed).length;
  const actives = total - terminees;

  return (
    <div className="todo-stats">
      <span>Total: {total}</span>
      <span>Actives: {actives}</span>
      <span>Terminees: {terminees}</span>
    </div>
  );
}

export default TodoStats;
