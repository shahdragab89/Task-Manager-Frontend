import { Sprout, Heart, Rocket, Sparkles, type LucideIcon } from "lucide-react";

interface Quote {
  icon: LucideIcon; // big icon on top
  accent: LucideIcon; // small icon at the bottom
  text: string;
}

// Add or change quotes here, the cards are generated from this list.
const quotes: Quote[] = [
  { icon: Sprout, accent: Heart, text: "Small steps make big progress" },
  { icon: Rocket, accent: Sparkles, text: "Done is better than perfect" },
];

export default function MotivationCard() {
  return (
    <div className="motivation-stack">
      {quotes.map(({ icon: Icon, accent: Accent, text }) => (
        <aside key={text} className="card motivation-card">
          <Icon size={48} strokeWidth={1.25} />
          <p>{text}</p>
          <Accent size={16} />
        </aside>
      ))}
    </div>
  );
}