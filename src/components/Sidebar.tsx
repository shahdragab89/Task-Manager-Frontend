import {
  Home,
  ListChecks,
  Settings,
  Info,
  Leaf,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";
import type { Page } from "../types/page";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const navItems: { id: Page; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "about", label: "About", icon: Info },
];

export default function Sidebar({
  activePage,
  onNavigate,
  darkMode,
  onToggleDarkMode,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Leaf size={22} />
        <span>TaskManager</span>
      </div>

      <nav className="nav">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${activePage === id ? "nav-item-active" : ""}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <button className="theme-toggle" onClick={onToggleDarkMode}>
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </aside>
  );
}
