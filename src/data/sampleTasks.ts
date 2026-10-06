import type { Task } from "../types/task";
import { addDays } from "../utils/date";

// Starter data so the Home page isn't empty. You'll remove this once
// "Add task" works.
export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Finish React project",
    completed: false,
    priority: "high",
    dueDate: addDays(0),
    category: "Study",
  },
  {
    id: "2",
    title: "Study TypeScript",
    completed: false,
    priority: "medium",
    dueDate: addDays(1),
    category: "Study",
  },
  {
    id: "3",
    title: "Grocery shopping",
    completed: false,
    priority: "low",
    dueDate: addDays(4),
    category: "Personal",
  },
  {
    id: "4",
    title: "Read the React docs",
    completed: true,
    priority: "high",
    dueDate: addDays(-1),
    category: "Study",
  },
  {
    id: "5",
    title: "Reply to emails",
    completed: true,
    priority: "low",
    dueDate: addDays(-2),
    category: "Work",
  },
];
