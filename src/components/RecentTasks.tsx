import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface RecentTasksProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onViewAll: () => void;
}

export default function RecentTasks({
  tasks,
  onToggle,
  onViewAll,
}: RecentTasksProps) {
  return (
    <section className="card recent-tasks">
      <div className="recent-header">
        <h2>Recent Tasks</h2>
        <button className="link-button" onClick={onViewAll}>
          View all
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-state">
          You're all caught up. New tasks will show up here.
        </p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} />
          ))}
        </ul>
      )}
    </section>
  );
}
