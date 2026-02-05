# TodoList React + API Backend

Application de gestion de taches construite avec React et Vite, connectee a une API backend Express/MySQL.

## Prerequis

- Node.js
- Le backend API doit etre lance sur le port 5000 (voir le repo backend)

## Installation

```bash
npm install
```

Copie le fichier d'environnement et adapte si besoin :

```bash
cp .env.example .env
```

## Developpement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## Structure du projet

```
src/
├── components/
│   ├── TodoForm.jsx        # Formulaire d'ajout
│   ├── TodoItem.jsx        # Element de tache
│   ├── TodoList.jsx        # Liste des taches
│   ├── TodoFilter.jsx      # Boutons de filtre
│   └── TodoStats.jsx       # Statistiques
├── hooks/
│   ├── useApi.js           # Hook API backend (GET, POST, PUT, DELETE)
│   ├── useLocalStorage.js  # Ancien hook localStorage (reference)
│   └── useTodos.js         # Ancien hook CRUD local (reference)
├── App.jsx
├── App.css
└── main.jsx
```

---

## TODO - Travail a realiser

Deux fonctions sont a completer dans le fichier `src/hooks/useApi.js`.

Les fonctions `fetchTodos` (GET), `ajouterTodo` (POST), `editerTodo` (PUT) et `toutSupprimer` (DELETE) sont deja codees. Inspire-toi de ces exemples pour completer les deux fonctions ci-dessous.

### TODO 1 : `toggleTodo` (PUT)

**Fichier :** `src/hooks/useApi.js` ligne 44

**Objectif :** Modifier le statut `completed` d'un todo en envoyant une requete PUT a l'API.

**Consigne :**
1. Retrouver le todo dans le state `todos` grace a son `id`
2. Envoyer une requete `PUT` sur `API_URL/${id}` avec le todo complet, en inversant la valeur de `completed` (penser a la conversion : le front utilise `true/false`, l'API attend `1/0`)
3. Rafraichir la liste en appelant `fetchTodos()`

**Indice :** Regarde la fonction `editerTodo` juste en dessous, le fonctionnement est quasiment identique.

### TODO 2 : `supprimerTodo` (DELETE)

**Fichier :** `src/hooks/useApi.js` ligne 49

**Objectif :** Supprimer un todo en envoyant une requete DELETE a l'API.

**Consigne :**
1. Envoyer une requete `DELETE` sur `API_URL/${id}`
2. Rafraichir la liste en appelant `fetchTodos()`

**Indice :** Regarde la fonction `toutSupprimer` juste en dessous, elle fait deja des appels DELETE unitaires.

---

## Rappel : correspondance des champs

| Frontend (React) | Backend (API) |
|------------------|---------------|
| `texte`          | `text`        |
| `completed: true/false` | `completed: 1/0` |

Cette conversion est deja geree dans `fetchTodos` (API vers front) et dans `ajouterTodo` / `editerTodo` (front vers API).

## Fichiers de reference

Les anciens hooks utilisant le localStorage sont conserves dans le projet (imports commentes) pour que tu puisses comparer les deux approches :

- `src/hooks/useLocalStorage.js` : persistance avec localStorage
- `src/hooks/useTodos.js` : logique CRUD en local

## Technologies

- React 19
- Vite 7
- Tailwind CSS 4
- API Backend Express + MySQL
