import { useState } from "react";
import { Sun, Moon, Trash2 } from "lucide-react";

interface SettingsProps {
  userName: string;
  onUserNameChange: (name: string) => void;
  darkMode: boolean;
  onDarkModeChange: (dark: boolean) => void;
  taskCount: number;
  onClearTasks: () => void;
}

export default function Settings({
  userName,
  onUserNameChange,
  darkMode,
  onDarkModeChange,
  taskCount,
  onClearTasks,
}: SettingsProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="page-narrow">
      <div className="page-heading">
        <h1>Settings</h1>
        <p>Make TaskManager feel like yours.</p>
      </div>

      <div className="card settings-card">
        <section className="settings-section">
          <h2>Profile</h2>
          <label className="field">
            <span className="field-label">Your name</span>
            <input
              className="input"
              maxLength={30}
              placeholder="Your name"
              value={userName}
              onChange={(event) => onUserNameChange(event.target.value)}
            />
          </label>
          <p className="hint">Shown in your greeting and on your avatar.</p>
        </section>

        <section className="settings-section">
          <h2>Appearance</h2>
          <div className="theme-options">
            <button
              className={`theme-option ${!darkMode ? "theme-option-active" : ""}`}
              aria-pressed={!darkMode}
              onClick={() => onDarkModeChange(false)}
            >
              <Sun size={18} />
              Light
            </button>
            <button
              className={`theme-option ${darkMode ? "theme-option-active" : ""}`}
              aria-pressed={darkMode}
              onClick={() => onDarkModeChange(true)}
            >
              <Moon size={18} />
              Dark
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h2>Data</h2>
          <p className="hint settings-hint">
            Your tasks are saved in this browser only. Clearing them removes
            all {taskCount} {taskCount === 1 ? "task" : "tasks"} from local
            storage.
          </p>

          {confirming ? (
            <div className="confirm-row">
              <span>Delete every task? This can't be undone.</span>
              <button
                className="btn btn-danger"
                onClick={() => {
                  onClearTasks();
                  setConfirming(false);
                }}
              >
                Yes, delete all
              </button>
              <button className="btn btn-ghost" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="btn btn-danger-soft"
              disabled={taskCount === 0}
              onClick={() => setConfirming(true)}
            >
              <Trash2 size={16} />
              Clear all tasks
            </button>
          )}
        </section>

        <section className="settings-section">
          <h2>About</h2>
          <p className="hint">TaskManager v1.0</p>
        </section>
      </div>
    </div>
  );
}
