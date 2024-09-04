import React, { useState } from 'react';

// Définition du type SubTask représentant une sous-tâche avec ID, titre et état d'achèvement
interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

// Définition des props attendues par le composant Task
interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high'; // Priorité de la tâche
  subTasks: SubTask[]; // Liste des sous-tâches associées à la tâche
  notes: string; // Notes ou commentaires associés à la tâche
  onToggle: (id: number) => void; // Fonction pour marquer la tâche comme complétée ou non
  onDelete: (id: number) => void; // Fonction pour supprimer la tâche
  onChangePriority: (id: number, priority: 'low' | 'medium' | 'high') => void; // Fonction pour changer la priorité de la tâche
  onAddSubTask: (taskId: number, title: string) => void; // Fonction pour ajouter une sous-tâche
  onToggleSubTask: (taskId: number, subTaskId: number) => void; // Fonction pour marquer une sous-tâche comme complétée ou non
  onDeleteSubTask: (taskId: number, subTaskId: number) => void; // Fonction pour supprimer une sous-tâche
  onUpdateNotes: (id: number, notes: string) => void; // Fonction pour mettre à jour les notes de la tâche
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  completed,
  priority,
  subTasks,
  notes,
  onToggle,
  onDelete,
  onChangePriority,
  onAddSubTask,
  onToggleSubTask,
  onDeleteSubTask,
  onUpdateNotes
}) => {
  // État local pour le titre de la sous-tâche à ajouter
  const [subTaskTitle, setSubTaskTitle] = useState('');
  
  // État local pour les notes de la tâche
  const [taskNotes, setTaskNotes] = useState(notes);

  // Fonction pour gérer le changement de priorité de la tâche
  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangePriority(id, event.target.value as 'low' | 'medium' | 'high');
  };

  // Fonction pour ajouter une sous-tâche
  const handleAddSubTask = () => {
    if (subTaskTitle.trim()) {
      onAddSubTask(id, subTaskTitle);
      setSubTaskTitle(''); // Réinitialiser le champ après ajout
    }
  };

  // Fonction pour gérer le changement des notes de la tâche
  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskNotes(event.target.value);
    onUpdateNotes(id, event.target.value); // Mettre à jour les notes dans le parent
  };

  return (
    <div className={`task priority-${priority}`}> {/* Classe dynamique basée sur la priorité */}
      <div className="task-info">
        <input 
          type="checkbox" 
          checked={completed} 
          onChange={() => onToggle(id)} // Marquer la tâche comme complétée ou non
        />
        <span>{title}</span>
        <select value={priority} onChange={handlePriorityChange}> {/* Sélecteur pour changer la priorité */}
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={() => onDelete(id)} title="Delete"> {/* Bouton pour supprimer la tâche */}
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>

      <div className="sub-tasks">
        <div className="sub-task-input">
          <input
            type="text"
            value={subTaskTitle}
            onChange={(e) => setSubTaskTitle(e.target.value)} // Mettre à jour le titre de la sous-tâche
            placeholder="Add a sub-task"
          />
          <button onClick={handleAddSubTask} title="Add Sub-Task"> {/* Bouton pour ajouter une sous-tâche */}
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <ul>
          {subTasks.map(subTask => (
            <li key={subTask.id}>
              <input
                type="checkbox"
                checked={subTask.completed}
                onChange={() => onToggleSubTask(id, subTask.id)} // Marquer la sous-tâche comme complétée ou non
              />
              {subTask.title}
              <button onClick={() => onDeleteSubTask(id, subTask.id)} title="Delete"> {/* Bouton pour supprimer une sous-tâche */}
                <i className="fas fa-trash-alt"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="notes">
        <textarea
          value={taskNotes}
          onChange={handleNotesChange} // Mettre à jour les notes
          placeholder="Add notes or comments"
        />
      </div>
    </div>
  );
};

export default Task;
