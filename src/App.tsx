import { useEffect, useState } from "react";
import type { Page } from "./types/page";
import type { Task } from "./types/task";
import { sampleTasks } from "./data/sampleTasks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";

const USER_NAME = "Shahd";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [tasks, setTasks] = useLocalStorage<Task[]>("taskmanager-tasks", sampleTasks);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("taskmanager-dark-mode", false);

  // Tell the whole page which theme is active (the CSS reads this attribute).
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="app">
      <Sidebar
        activePage={page}
        onNavigate={setPage}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((current) => !current)}
      />

      <div className="content">
        <Topbar userName={USER_NAME} />
        <main className="main">
          {page === "home" ? (
            <Home
              userName={USER_NAME}
              tasks={tasks}
              onToggleTask={toggleTask}
              onViewAll={() => setPage("tasks")}
            />
          ) : (
            <p className="empty-state">This page is coming soon.</p>
          )}
        </main>
      </div>
    </div>
  );
}