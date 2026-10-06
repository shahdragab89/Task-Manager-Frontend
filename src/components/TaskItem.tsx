import { MoreVertical } from "lucide-react";
import type { Task } from "../types/task";
import { formatDueDate } from "../utils/date";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as complete`}
      />

      <div className="task-info">
        <span className={`task-title ${task.completed ? "task-done" : ""}`}>
          {task.title}
        </span>
        <span className="task-meta">
          <span className={`priority priority-${task.priority}`}>
            <span className="priority-dot" />
            {task.priority}
          </span>
          <span className="task-date">{formatDueDate(task.dueDate)}</span>
        </span>
      </div>

      <button className="icon-button" aria-label="Task options">
        <MoreVertical size={18} />
      </button>
    </li>
  );
}
