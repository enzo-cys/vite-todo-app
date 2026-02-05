import { useState } from 'react';

/**
 * Formulaire d'ajout de todo
 * Props: onAjouter - fonction appelée avec le texte du todo
 */
function TodoForm({ onAjouter }) {
  const [inputValue, setInputValue] = useState('');
  const [erreur, setErreur] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: pas de todo vide
    if (inputValue.trim() === '') {
      setErreur('La tache ne peut pas etre vide');
      return;
    }

    onAjouter(inputValue.trim());
    setInputValue('');
    setErreur('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ajouter une nouvelle tache..."
        className="todo-input"
      />
      <button type="submit" className="btn-ajouter">
        Ajouter
      </button>
      {erreur && <p className="erreur">{erreur}</p>}
    </form>
  );
}

export default TodoForm;
