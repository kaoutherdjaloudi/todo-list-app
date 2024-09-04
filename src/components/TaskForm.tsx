// src/components/TaskForm.tsx
import React, { useState } from 'react';

// Interface pour les propriétés attendues par le composant TaskForm
interface TaskFormProps {
  onAddTask: (title: string, priority: 'low' | 'medium' | 'high') => void; // Fonction appelée pour ajouter une nouvelle tâche
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  // État local pour stocker le titre de la tâche et la priorité sélectionnée
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

  // Gestionnaire d'événement pour le soumission du formulaire
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
    if (title.trim()) { // Vérifie que le titre n'est pas vide
      onAddTask(title, priority); // Appelle la fonction de rappel avec le titre et la priorité
      setTitle(''); // Réinitialise le titre du formulaire
      setPriority('low'); // Réinitialise la priorité à 'low'
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Champ de texte pour entrer le titre de la tâche */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Met à jour l'état 'title' à chaque changement de valeur
        placeholder="Add a new task" // Texte d'espace réservé dans le champ de texte
      />
      {/* Menu déroulant pour sélectionner la priorité de la tâche */}
      <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      {/* Bouton pour soumettre le formulaire */}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
