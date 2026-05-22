import LogLine from "./LogLine";

export default function ParsedLogViewer({ logs }) {
  return (
    <div className="bg-zinc-900 rounded overflow-hidden">
      {logs.map((log, idx) => (
        <LogLine
          key={idx}
          log={log}
        />
      ))}
    </div>
  );
}