import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { CATEGORIES, type Priority, type Task, type TaskInput } from "../types/task";
import { getStatus } from "../utils/taskStatus";
import TaskTable from "../components/TaskTable";
import TaskModal from "../components/TaskModal";
import illustration from "../assets/undraw_completed-tasks_1j9z.svg";

type StatusFilter = "all" | "active" | "completed";

interface TasksProps {
  tasks: Task[];
  onAddTask: (data: TaskInput) => void;
  onUpdateTask: (id: string, data: TaskInput) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function Tasks({
  tasks,
  onAddTask,
  onUpdateTask,
  onToggleTask,
  onDeleteTask,
}: TasksProps) {
  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");

  // Popup
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // ----- Derived data (recalculated on every render, no extra state) -----
  const query = search.trim().toLowerCase();

  const visibleTasks = tasks
    .filter((task) => {
      if (statusFilter === "active") return !task.completed;
      if (statusFilter === "completed") return task.completed;
      return true;
    })
    .filter((task) => categoryFilter === "all" || task.category === categoryFilter)
    .filter((task) => priorityFilter === "all" || task.priority === priorityFilter)
    .filter(
      (task) =>
        !query ||
        task.title.toLowerCase().includes(query) ||
        (task.description ?? "").toLowerCase().includes(query)
    )
    // Open tasks first, then by due date. (filter() made a new array, so
    // sorting it doesn't touch the original `tasks`.)
    .sort(
      (a, b) =>
        Number(a.completed) - Number(b.completed) ||
        a.dueDate.localeCompare(b.dueDate)
    );

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;
  const overdue = tasks.filter((task) => getStatus(task) === "overdue").length;
  const dueToday = tasks.filter((task) => getStatus(task) === "today").length;

  const hasFilters =
    query !== "" ||
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    priorityFilter !== "all";

  // The sentence next to the illustration changes with what's going on
  let heroMessage: string;
  if (tasks.length === 0) {
    heroMessage = "Nothing here yet. Add your first task to get started.";
  } else if (overdue > 0) {
    heroMessage = `${overdue} ${overdue === 1 ? "task is" : "tasks are"} overdue. Let's catch up.`;
  } else if (dueToday > 0) {
    heroMessage = `${dueToday} ${dueToday === 1 ? "task is" : "tasks are"} due today.`;
  } else if (activeCount > 0) {
    heroMessage = `You're on track, with ${activeCount} open ${activeCount === 1 ? "task" : "tasks"} ahead.`;
  } else {
    heroMessage = "All clear. Every task is done.";
  }

  // ----- Handlers -----
  function openAddModal() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEditModal(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTask(null);
  }

  function handleSave(data: TaskInput) {
    if (editingTask) {
      onUpdateTask(editingTask.id, data);
    } else {
      onAddTask(data);
    }
    closeModal();
  }

  function handleDelete(task: Task) {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDeleteTask(task.id);
    }
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setPriorityFilter("all");
  }

  const tabs: { id: StatusFilter; label: string; count: number }[] = [
    { id: "all", label: "All", count: tasks.length },
    { id: "active", label: "Active", count: activeCount },
    { id: "completed", label: "Completed", count: completedCount },
  ];

  return (
    <div className="tasks-page">
      <section className="page-hero">
        <div>
          <h1>Tasks</h1>
          <p>{heroMessage}</p>
        </div>
        <img src={illustration} alt="" className="page-hero-img" />
      </section>

      <div className="toolbar">
        <label className="search">
          <Search size={16} />
          <input
            className="input"
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={16} />
          Add task
        </button>
      </div>

      <div className="filters">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${statusFilter === tab.id ? "tab-active" : ""}`}
              onClick={() => setStatusFilter(tab.id)}
            >
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="selects">
          <select
            className="input"
            aria-label="Filter by category"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <select
            className="input"
            aria-label="Filter by priority"
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value as Priority | "all")
            }
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {visibleTasks.length > 0 ? (
        <TaskTable
          tasks={visibleTasks}
          onToggle={onToggleTask}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      ) : (
        <div className="card empty-card">
          {hasFilters ? (
            <>
              <h2>No tasks match your filters</h2>
              <p>Try a different search or clear the filters.</p>
              <button className="btn btn-ghost" onClick={clearFilters}>
                Clear filters
              </button>
            </>
          ) : (
            <>
              <h2>No tasks yet</h2>
              <p>Add a task and it will show up here.</p>
              <button className="btn btn-primary" onClick={openAddModal}>
                <Plus size={16} />
                Add task
              </button>
            </>
          )}
        </div>
      )}

      {modalOpen && (
        <TaskModal
          key={editingTask?.id ?? "new"}
          task={editingTask}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
