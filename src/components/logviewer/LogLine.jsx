export default function LogLine({ log }) {
  return (
    <div
      className={`
        p-2 border-b border-zinc-800 font-mono text-sm
        ${log.isError ? "bg-red-950 text-red-300" : ""}
        ${log.isWarn ? "bg-yellow-950 text-yellow-300" : ""}
      `}
    >
      {log.raw}
    </div>
  );
}