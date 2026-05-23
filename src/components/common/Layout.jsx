import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({
  children,
}) {

  return (
    <div
      className="
        flex
        h-screen
        bg-[var(--color-bg)]
        text-[var(--color-text)]
        overflow-hidden
      "
    >

      <Sidebar />

      <div
        className="
          flex
          flex-col
          flex-1
          min-w-0
        "
      >

        <Header />

        <main
          className="
            flex-1
            overflow-auto
            p-4
            md:p-6
          "
        >
          {children}
        </main>

      </div>

    </div>
  );
}