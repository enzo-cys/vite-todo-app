/**
 * Boutons de filtre pour les todos
 * Props: filtre (actuel), setFiltre
 */
function TodoFilter({ filtre, setFiltre }) {
  const filtres = ['toutes', 'actives', 'terminees'];

  return (
    <div className="todo-filtres">
      {filtres.map(f => (
        <button
          key={f}
          onClick={() => setFiltre(f)}
          className={`btn-filtre ${filtre === f ? 'actif' : ''}`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
