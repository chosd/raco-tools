import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
    <aside
      className="
        w-20
        md:w-64
        border-r
        border-[var(--color-border)]
        p-2
        md:p-4
        shrink-0
      "
    >

      <nav
        className="
          flex
          flex-col
          gap-2
        "
      >

        <Link
          to="/"
          className="
            hover:bg-[var(--color-surface)]
            transition-colors
            p-2
            rounded
            text-sm
            md:text-base
          "
        >
          Home
        </Link>

        <Link
          to="/json"
          className="
            hover:bg-[var(--color-surface)]
            transition-colors
            p-2
            rounded
            text-sm
            md:text-base
          "
        >
          JSON Formatter
        </Link>

        <Link
          to="/log"
          className="
            hover:bg-[var(--color-surface)]
            transition-colors
            p-2
            rounded
            text-sm
            md:text-base
          "
        >
          Log Viewer
        </Link>

      </nav>

    </aside>
  );
}