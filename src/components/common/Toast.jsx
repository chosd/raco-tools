export default function Toast({
  message,
  type = "info",
}) {

  const bgColor = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-zinc-700",
  }[type];

  return (
    <div
      className={`
        fixed
        top-4
        right-4
        z-50
        min-w-[220px]
        px-4
        py-3
        rounded-lg
        shadow-lg
        text-[var(--color-text)]
        font-medium
        animate-pulse
        ${bgColor}
      `}
    >
      {message}
    </div>
  );
}