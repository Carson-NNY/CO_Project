import React, { useState, ReactNode } from "react";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

interface Tasks {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

interface TasksProps {
  children: (context: Tasks) => ReactNode;
}

export default function Tasks({ children }: TasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const today = new Date().toISOString().split("T")[0]; // make the date in YYYY-MM-DD format

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      date: today,
    };
    setTasks((prev) => [newTask, ...prev]); // add the new task to the top of the list so it's showing first on the screen
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return <>{children({ tasks, addTask, toggleTask, deleteTask })}</>;
}
