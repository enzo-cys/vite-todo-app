import { useState, useEffect } from 'react';

/**
 * Hook pour synchroniser un state avec localStorage
 * @param {string} key - Clé de stockage
 * @param {any} initialValue - Valeur initiale si rien en storage
 */
function useLocalStorage(key, initialValue) {
  // Initialise le state avec la valeur du localStorage ou la valeur initiale
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  // Synchronise avec localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
