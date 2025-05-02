import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const TaskContext = createContext(undefined);

// Sample tasks for demonstration
const sampleTasks = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the TaskTango project proposal with all requirements",
    completed: false,
    category: "Work",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and vegetables",
    completed: true,
    category: "Personal",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Workout session",
    description: "30 minutes cardio and strength training",
    completed: false,
    category: "Health",
    createdAt: new Date().toISOString(),
  },
];

// Provider component
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskTangoTasks");
    return savedTasks ? JSON.parse(savedTasks) : sampleTasks;
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskTangoTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  // Update existing task
  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle completion status
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook to use the task context
export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
