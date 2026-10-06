import type { ReactNode } from "react";

type Variant = "default" | "green" | "rose";

interface StatCardProps {
  icon: ReactNode;
  value: number;
  label: string;
  percent: number; // 0–100, drives the progress bar
  caption: string; // small text next to the percent, e.g. "Of total"
  variant?: Variant;
}

export default function StatCard({
  icon,
  value,
  label,
  percent,
  caption,
  variant = "default",
}: StatCardProps) {
  return (
    <div className={`stat-card stat-card-${variant}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>

      <div className="stat-footer">
        <div className="stat-progress">
          <div className="stat-progress-text">
            <span>{caption}</span>
            <strong>{percent}%</strong>
          </div>
          <div className="stat-bar">
            <div className="stat-bar-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <div className="stat-icon">{icon}</div>
      </div>
    </div>
  );
}