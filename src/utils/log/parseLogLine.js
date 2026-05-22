export function parseLogLine(line) {
  const timestampRegex = /(\d{2}:\d{2}:\d{2})/;
//   const callIdRegex = /CALL_ID=([a-zA-Z0-9-_]+)/;

  const timestampMatch = line.match(timestampRegex);
//   const callIdMatch = line.match(callIdRegex);

  return {
    raw: line,
    timestamp: timestampMatch?.[1] || null,
    // callId: callIdMatch?.[1] || null,
    isError: line.includes("ERROR"),
    isWarn: line.includes("WARN"),
  };
}