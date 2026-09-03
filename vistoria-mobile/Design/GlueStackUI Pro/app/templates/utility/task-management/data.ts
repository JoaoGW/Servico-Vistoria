import { Task, TaskCategory } from "./types";

export const taskCategories: TaskCategory[] = [
  { id: "work", name: "Work", color: "bg-blue-500", icon: "💼" },
  { id: "personal", name: "Personal", color: "bg-green-500", icon: "🏠" },
  { id: "health", name: "Health", color: "bg-red-500", icon: "💪" },
  { id: "finance", name: "Finance", color: "bg-yellow-500", icon: "💰" },
  { id: "learning", name: "Learning", color: "bg-purple-500", icon: "📚" },
  { id: "shopping", name: "Shopping", color: "bg-pink-500", icon: "🛒" },
];

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the Q4 project proposal and send to stakeholders",
    completed: false,
    dueDate: new Date(2024, 11, 20), // December 20, 2024
    priority: "high",
    category: "work",
    createdAt: new Date(2024, 11, 15),
    updatedAt: new Date(2024, 11, 15),
  },
  {
    id: "2",
    title: "Grocery shopping",
    description: "Buy ingredients for weekend dinner party",
    completed: false,
    dueDate: new Date(2024, 11, 18), // December 18, 2024
    priority: "medium",
    category: "shopping",
    createdAt: new Date(2024, 11, 16),
    updatedAt: new Date(2024, 11, 16),
  },
  {
    id: "3",
    title: "Morning workout",
    description: "30-minute cardio session",
    completed: true,
    dueDate: new Date(2024, 11, 17), // December 17, 2024
    priority: "medium",
    category: "health",
    createdAt: new Date(2024, 11, 17),
    updatedAt: new Date(2024, 11, 17),
  },
  {
    id: "4",
    title: "Review budget",
    description: "Check monthly expenses and plan for next month",
    completed: false,
    dueDate: new Date(2024, 11, 25), // December 25, 2024
    priority: "high",
    category: "finance",
    createdAt: new Date(2024, 11, 14),
    updatedAt: new Date(2024, 11, 14),
  },
  {
    id: "5",
    title: "Read React Native book",
    description: "Complete chapter 5 on navigation",
    completed: false,
    dueDate: new Date(2024, 11, 22), // December 22, 2024
    priority: "low",
    category: "learning",
    createdAt: new Date(2024, 11, 13),
    updatedAt: new Date(2024, 11, 13),
  },
  {
    id: "6",
    title: "Call dentist",
    description: "Schedule annual checkup",
    completed: false,
    dueDate: new Date(2024, 11, 19), // December 19, 2024
    priority: "medium",
    category: "health",
    createdAt: new Date(2024, 11, 12),
    updatedAt: new Date(2024, 11, 12),
  },
  {
    id: "7",
    title: "Plan weekend trip",
    description: "Research destinations and book accommodation",
    completed: true,
    dueDate: new Date(2024, 11, 16), // December 16, 2024
    priority: "low",
    category: "personal",
    createdAt: new Date(2024, 11, 10),
    updatedAt: new Date(2024, 11, 16),
  },
  {
    id: "8",
    title: "Update portfolio website",
    description: "Add new projects and update resume",
    completed: false,
    dueDate: new Date(2024, 11, 30), // December 30, 2024
    priority: "medium",
    category: "work",
    createdAt: new Date(2024, 11, 11),
    updatedAt: new Date(2024, 11, 11),
  },
];
