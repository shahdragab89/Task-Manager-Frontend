import { Leaf, Check, Heart } from "lucide-react";
import Pill from "../components/Pill";

interface AboutProps {
  userName: string;
}

const features = [
  "Add, edit and delete tasks",
  "Set a priority, due date and category",
  "Search and filter your list",
  "Light and dark mode",
  "Everything saved in your browser",
];

const stack = ["React", "TypeScript", "CSS", "localStorage"];

export default function About({ userName }: AboutProps) {
  return (
    <div className="page-narrow">
      <div className="page-heading">
        <h1>About</h1>
      </div>

      <div className="card about-card">
        <div className="about-brand">
          <span className="about-logo">
            <Leaf size={26} />
          </span>
          <div>
            <h2>TaskManager</h2>
            <p>Version 1.0</p>
          </div>
        </div>

        <p className="about-text">
          A simple and beautiful task manager that runs entirely in your
          browser. No account, no backend, just your tasks.
        </p>

        <div className="chips">
          {stack.map((name) => (
            <Pill key={name} tone="green">
              {name}
            </Pill>
          ))}
        </div>

        <h3>Features</h3>
        <ul className="feature-list">
          {features.map((feature) => (
            <li key={feature}>
              <Check size={16} />
              {feature}
            </li>
          ))}
        </ul>

        <p className="about-footer">
          Built with <Heart size={14} className="about-heart" /> by {userName}
        </p>
      </div>
    </div>
  );
}
