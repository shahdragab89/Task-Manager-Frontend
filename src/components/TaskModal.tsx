import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import {
  CATEGORIES,
  PRIORITIES,
  type Priority,
  type Task,
  type TaskInput,
} from "../types/task";
import { addDays } from "../utils/date";

interface TaskModalProps {
  task: Task | null; // null = adding a new task, otherwise editing this one
  onSave: (data: TaskInput) => void;
  onClose: () => void;
}

export default function TaskModal({ task, onSave, onClose }: TaskModalProps) {
  // Controlled inputs: each field has its own state, starting from the task
  // being edited (or sensible defaults for a new one).
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState<Priority>(task?.priority ?? "medium");
  const [category, setCategory] = useState(task?.category ?? CATEGORIES[0]);
  const [dueDate, setDueDate] = useState(task?.dueDate ?? addDays(0));
  const [error, setError] = useState("");

  // Close with the Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Give your task a title.");
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
    });
  }

  return (
    // Clicking the dark background closes the popup, clicking inside doesn't
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="task-modal-title">{task ? "Edit task" : "New task"}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Task</span>
            <input
              className="input"
              autoFocus
              placeholder="What do you need to do?"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setError("");
              }}
            />
            {error && <span className="form-error">{error}</span>}
          </label>

          <label className="field">
            <span className="field-label">Description (optional)</span>
            <textarea
              className="input"
              rows={3}
              placeholder="Add a few details"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>

          <div className="form-row">
            <label className="field">
              <span className="field-label">Category</span>
              <select
                className="input"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {CATEGORIES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">Due date</span>
              <input
                className="input"
                type="date"
                required
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </label>
          </div>

          <div className="field">
            <span className="field-label">Priority</span>
            <div className="segmented">
              {PRIORITIES.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`segment segment-${level} ${
                    priority === level ? "segment-active" : ""
                  }`}
                  aria-pressed={priority === level}
                  onClick={() => setPriority(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
