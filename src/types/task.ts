export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string; // optional, so tasks saved before this field existed still work
  completed: boolean;
  priority: Priority;
  dueDate: string; // stored as "YYYY-MM-DD"
  category: string;
}

// What the "New task" form produces (id and completed are added by App)
export type TaskInput = Omit<Task, "id" | "completed">;

export const CATEGORIES = ["Work", "Study", "Personal", "Health", "Other"];
export const PRIORITIES: Priority[] = ["low", "medium", "high"];
