import { ClipboardList, CheckCircle2, Clock, Flame } from "lucide-react";
import type { Task } from "../types/task";
import { addDays, getGreeting } from "../utils/date";
import StatCard from "../components/StatCard";
import RecentTasks from "../components/RecentTasks";
import MotivationCard from "../components/MotivationCard";
import welcomeIllustration from "../assets/undraw_join_niai.svg";

interface HomeProps {
  userName: string;
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onViewAll: () => void;
}

// part / whole as a whole-number percent (and 0 when there are no tasks yet)
function percentOf(part: number, whole: number): number {
  return whole === 0 ? 0 : Math.round((part / whole) * 100);
}

export default function Home({
  userName,
  tasks,
  onToggleTask,
  onViewAll,
}: HomeProps) {
  // Derived values: calculated from `tasks` on every render
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter((task) => task.priority === "high").length;

  // A task is overdue if it's not done and its due date is before today
  const today = addDays(0);
  const overdue = tasks.filter(
    (task) => !task.completed && task.dueDate < today
  ).length;

  const recentTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3);

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="home">
      <div className="welcome-banner">
        <div className="welcome-text-content">
          <span className="welcome-date">{currentDate}</span>
          <h1>
            {getGreeting()}, {userName}!
          </h1>
          <p>Always stay updated in your task portal</p>
        </div>
        <div className="welcome-illustration-wrapper">
          <img
            src={welcomeIllustration}
            alt=""
            className="welcome-svg"
          />
        </div>
      </div>

      <div className="home-grid">
        <div className="home-main">
          <div className="section-title-wrapper">
            <h2>Overview</h2>
          </div>

          <div className="stats">
            <StatCard
              icon={<ClipboardList size={20} />}
              value={total}
              label="Total Tasks"
              percent={percentOf(total - overdue, total)}
              caption="On track"
            />
            <StatCard
              icon={<CheckCircle2 size={20} />}
              value={completed}
              label="Completed Tasks"
              percent={percentOf(completed, total)}
              caption="Of total"
              variant="green"
            />
            <StatCard
              icon={<Clock size={20} />}
              value={pending}
              label="Pending Tasks"
              percent={percentOf(pending, total)}
              caption="Of total"
            />
            <StatCard
              icon={<Flame size={20} />}
              value={highPriority}
              label="High Priority"
              percent={percentOf(highPriority, total)}
              caption="Of total"
              variant="rose"
            />
          </div>

          <RecentTasks
            tasks={recentTasks}
            onToggle={onToggleTask}
            onViewAll={onViewAll}
          />
        </div>

        <MotivationCard />
      </div>
    </div>
  );
}