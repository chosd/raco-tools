import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 p-4">
      <nav className="flex flex-col gap-2">

        <Link
          to="/"
          className="hover:bg-zinc-800 p-2 rounded"
        >
          Home
        </Link>

        <Link
          to="/json"
          className="hover:bg-zinc-800 p-2 rounded"
        >
          JSON Formatter
        </Link>

        <Link
          to="/log"
          className="hover:bg-zinc-800 p-2 rounded"
        >
          Log Viewer
        </Link>

      </nav>
    </aside>
  );
}