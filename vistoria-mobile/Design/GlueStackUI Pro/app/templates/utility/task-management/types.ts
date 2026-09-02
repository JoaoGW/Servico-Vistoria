export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFilter {
  showCompleted: boolean;
  priority?: "low" | "medium" | "high";
  category?: string;
  dueDate?: "today" | "thisWeek" | "overdue";
}

export interface TaskCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}
