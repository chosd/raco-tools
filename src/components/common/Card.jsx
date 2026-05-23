export default function Card({

  children,

  className = "",

}) {

  return (
    <div
      className={`
        bg-[var(--color-surface)]
        border
        border-[var(--color-border)]
        rounded-2xl
        p-4
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}