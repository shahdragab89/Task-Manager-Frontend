import type { Task } from "../types/task";
import { addDays } from "./date";

export type TaskStatus = "completed" | "overdue" | "today" | "pending";

export const statusLabels: Record<TaskStatus, string> = {
  completed: "Completed",
  overdue: "Overdue",
  today: "Due today",
  pending: "Pending",
};

// The status is calculated from the task, so it can never get out of sync.
export function getStatus(task: Task): TaskStatus {
  if (task.completed) return "completed";

  const today = addDays(0);
  if (task.dueDate < today) return "overdue";
  if (task.dueDate === today) return "today";
  return "pending";
}
