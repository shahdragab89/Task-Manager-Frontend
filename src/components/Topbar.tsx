import { Search, MoreVertical } from "lucide-react";

interface TopbarProps {
  userName: string;
}

export default function Topbar({ userName }: TopbarProps) {
  return (
    <header className="topbar">
      <button className="icon-button" aria-label="Search">
        <Search size={18} />
      </button>
      <button className="icon-button" aria-label="More options">
        <MoreVertical size={18} />
      </button>
      <div className="avatar" aria-label={userName}>
        {userName.charAt(0).toUpperCase()}
      </div>
    </header>
  );
}
