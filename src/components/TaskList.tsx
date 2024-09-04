// src/components/TaskList.tsx
import React from 'react';
import Task from './Task';

// Définition du type SubTask représentant une sous-tâche avec ID, titre et état d'achèvement
interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

// Définition du type Task représentant une tâche avec ID, titre, état d'achèvement, priorité, sous-tâches et notes
interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high'; // Priorité de la tâche
  subTasks: SubTask[]; // Liste des sous-tâches associées à la tâche
  notes: string; // Notes ou commentaires associés à la tâche
}

// Définition des props attendues par le composant TaskList
interface TaskListProps {
  tasks: Task[]; // Liste des tâches à afficher
  onToggle: (id: number) => void; // Fonction pour marquer une tâche comme complétée ou non
  onDelete: (id: number) => void; // Fonction pour supprimer une tâche
  onChangePriority: (id: number, priority: 'low' | 'medium' | 'high') => void; // Fonction pour changer la priorité d'une tâche
  onAddSubTask: (taskId: number, title: string) => void; // Fonction pour ajouter une sous-tâche
  onToggleSubTask: (taskId: number, subTaskId: number) => void; // Fonction pour marquer une sous-tâche comme complétée ou non
  onDeleteSubTask: (taskId: number, subTaskId: number) => void; // Fonction pour supprimer une sous-tâche
  onUpdateNotes: (id: number, notes: string) => void; // Fonction pour mettre à jour les notes d'une tâche
}

// Composant TaskList affichant une liste de tâches
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  onChangePriority,
  onAddSubTask,
  onToggleSubTask,
  onDeleteSubTask,
  onUpdateNotes
}) => {
  return (
    <div className="task-list">
      {/* Itération sur chaque tâche et rendu du composant Task */}
      {tasks.map(task => (
        <Task
          key={task.id} // Utilisation de l'ID comme clé pour une gestion efficace des éléments de la liste
          id={task.id}
          title={task.title}
          completed={task.completed}
          priority={task.priority}
          subTasks={task.subTasks}
          notes={task.notes}
          onToggle={onToggle}
          onDelete={onDelete}
          onChangePriority={onChangePriority}
          onAddSubTask={onAddSubTask}
          onToggleSubTask={onToggleSubTask}
          onDeleteSubTask={onDeleteSubTask}
          onUpdateNotes={onUpdateNotes}
        />
      ))}
    </div>
  );
};

export default TaskList;
