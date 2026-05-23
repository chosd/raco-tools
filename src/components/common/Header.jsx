export default function Header() {
  return (
    <header
      className="
        h-14
        border-b
        border-[var(--color-border)]
        flex
        items-center
        px-4
        md:px-6
        shrink-0
      "
    >

      <h1
        className="
          text-lg
          md:text-xl
          font-bold
          tracking-wide
        "
      >
        Raco Tools
      </h1>

    </header>
  );
}