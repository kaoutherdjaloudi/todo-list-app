// src/App.tsx
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/App.css';

// Définition des types pour SubTask et Task
interface SubTask {
  id: number; // Identifiant unique de la sous-tâche
  title: string; // Titre de la sous-tâche
  completed: boolean; // Statut de complétion de la sous-tâche
}

interface Task {
  id: number; // Identifiant unique de la tâche
  title: string; // Titre de la tâche
  completed: boolean; // Statut de complétion de la tâche
  priority: 'low' | 'medium' | 'high'; // Priorité de la tâche
  subTasks: SubTask[]; // Liste des sous-tâches associées à la tâche
  notes: string; // Notes ou commentaires associés à la tâche
}

const App: React.FC = () => {
  // État pour stocker la liste des tâches et le filtre appliqué
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

  // Fonction pour ajouter une nouvelle tâche
  const addTask = (title: string, priority: 'low' | 'medium' | 'high') => {
    setTasks([...tasks, { id: Date.now(), title, completed: false, priority, subTasks: [], notes: '' }]);
  };

  // Fonction pour ajouter une nouvelle sous-tâche à une tâche existante
  const addSubTask = (taskId: number, title: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, subTasks: [...task.subTasks, { id: Date.now(), title, completed: false }] } : task
    ));
  };

  // Fonction pour basculer le statut de complétion d'une tâche
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Fonction pour basculer le statut de complétion d'une sous-tâche
  const toggleSubTask = (taskId: number, subTaskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, subTasks: task.subTasks.map(subTask =>
            subTask.id === subTaskId ? { ...subTask, completed: !subTask.completed } : subTask
          ) }
        : task
    ));
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Fonction pour supprimer une sous-tâche d'une tâche
  const deleteSubTask = (taskId: number, subTaskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, subTasks: task.subTasks.filter(subTask => subTask.id !== subTaskId) }
        : task
    ));
  };

  // Fonction pour modifier la priorité d'une tâche
  const changeTaskPriority = (id: number, priority: 'low' | 'medium' | 'high') => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  // Fonction pour mettre à jour les notes d'une tâche
  const updateTaskNotes = (id: number, notes: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, notes } : task
    ));
  };

  // Filtrage des tâches en fonction du filtre sélectionné
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true; // 'all'
  });

  return (
    <div className="app">
      <h1>To-Do List</h1>
      {/* Composant pour ajouter une nouvelle tâche */}
      <TaskForm onAddTask={addTask} />
      {/* Composants pour les filtres de tâches */}
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('active')}>Active</button>
      </div>
      {/* Composant pour afficher la liste des tâches */}
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onChangePriority={changeTaskPriority}
        onAddSubTask={addSubTask}
        onToggleSubTask={toggleSubTask}
        onDeleteSubTask={deleteSubTask}
        onUpdateNotes={updateTaskNotes}
      />
    </div>
  );
};

export default App;
