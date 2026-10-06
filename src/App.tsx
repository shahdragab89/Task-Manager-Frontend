import { useEffect, useState } from "react";
import type { Page } from "./types/page";
import type { Task, TaskInput } from "./types/task";
import { sampleTasks } from "./data/sampleTasks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import About from "./pages/About";
import "./styles/pages.css";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [tasks, setTasks] = useLocalStorage<Task[]>("taskmanager-tasks", sampleTasks);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("taskmanager-dark-mode", false);
  const [userName, setUserName] = useLocalStorage<string>("taskmanager-user-name", "Shahd");

  // If the name field in Settings is empty, fall back to something friendly
  const displayName = userName.trim() || "there";

  // Tell the whole page which theme is active (the CSS reads this attribute).
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  // ----- Task actions (all state changes happen here, pages just call them) -----
  function addTask(data: TaskInput) {
    const newTask: Task = { id: crypto.randomUUID(), completed: false, ...data };
    setTasks((current) => [newTask, ...current]);
  }

  function updateTask(id: string, data: TaskInput) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function renderPage() {
    switch (page) {
      case "home":
        return (
          <Home
            userName={displayName}
            tasks={tasks}
            onToggleTask={toggleTask}
            onViewAll={() => setPage("tasks")}
          />
        );
      case "tasks":
        return (
          <Tasks
            tasks={tasks}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        );
      case "settings":
        return (
          <Settings
            userName={userName}
            onUserNameChange={setUserName}
            darkMode={darkMode}
            onDarkModeChange={setDarkMode}
            taskCount={tasks.length}
            onClearTasks={() => setTasks([])}
          />
        );
      case "about":
        return <About userName={displayName} />;
    }
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
        <Topbar userName={displayName} />
        <main className="main">{renderPage()}</main>
      </div>
    </div>
  );
}