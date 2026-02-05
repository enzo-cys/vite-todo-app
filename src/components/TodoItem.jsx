import { useState } from 'react';

/**
 * Composant pour une tache individuelle
 * Props: todo, onToggle, onSupprimer, onEditer
 */
function TodoItem({ todo, onToggle, onSupprimer, onEditer }) {
  const [edition, setEdition] = useState(false);
  const [texteEdition, setTexteEdition] = useState(todo.texte);

  const handleEditer = (e) => {
    e.preventDefault();
    if (texteEdition.trim() !== '') {
      onEditer(todo.id, texteEdition.trim());
      setEdition(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />

      {edition ? (
        <form onSubmit={handleEditer} className="edit-form">
          <input
            type="text"
            value={texteEdition}
            onChange={(e) => setTexteEdition(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <button type="submit" className="btn-save">OK</button>
          <button type="button" onClick={() => setEdition(false)} className="btn-cancel">
            Annuler
          </button>
        </form>
      ) : (
        <>
          <span
            className="todo-texte"
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.texte}
          </span>
          <div className="todo-actions">
            <button onClick={() => setEdition(true)} className="btn-editer">
              Editer
            </button>
            <button onClick={() => onSupprimer(todo.id)} className="btn-supprimer">
              Supprimer
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
