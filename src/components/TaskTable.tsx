import { Pencil, Trash2 } from "lucide-react";
import type { Priority, Task } from "../types/task";
import { formatDueDate } from "../utils/date";
import { getStatus, statusLabels, type TaskStatus } from "../utils/taskStatus";
import Pill, { type Tone } from "./Pill";

interface TaskTableProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const categoryTone: Record<string, Tone> = {
  Work: "blue",
  Study: "violet",
  Personal: "rose",
  Health: "teal",
};

const priorityTone: Record<Priority, Tone> = {
  high: "rose",
  medium: "amber",
  low: "green",
};

const statusTone: Record<TaskStatus, Tone> = {
  completed: "green",
  overdue: "rose",
  today: "amber",
  pending: "gray",
};

export default function TaskTable({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: TaskTableProps) {
  return (
    <div className="table-wrap">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Due date</th>
            <th>Status</th>
            <th>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const status = getStatus(task);

            return (
              <tr key={task.id}>
                <td>
                  <div className="task-cell">
                    <input
                      type="checkbox"
                      className="task-checkbox"
                      checked={task.completed}
                      onChange={() => onToggle(task.id)}
                      aria-label={`Mark "${task.title}" as complete`}
                    />
                    <div className="task-text">
                      <span
                        className={`task-name ${task.completed ? "task-done" : ""}`}
                      >
                        {task.title}
                      </span>
                      {task.description && (
                        <span className="task-desc">{task.description}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <Pill tone={categoryTone[task.category] ?? "gray"}>
                    {task.category}
                  </Pill>
                </td>
                <td>
                  <Pill tone={priorityTone[task.priority]}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Pill>
                </td>
                <td className={status === "overdue" ? "due-overdue" : ""}>
                  {formatDueDate(task.dueDate)}
                </td>
                <td>
                  <Pill tone={statusTone[status]}>{statusLabels[status]}</Pill>
                </td>
                <td>
                  <div className="row-actions">
                    <button
                      className="icon-button"
                      aria-label={`Edit "${task.title}"`}
                      onClick={() => onEdit(task)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="icon-button icon-button-danger"
                      aria-label={`Delete "${task.title}"`}
                      onClick={() => onDelete(task)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
