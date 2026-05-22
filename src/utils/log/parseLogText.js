import { parseLogLine } from "./parseLogLine";

export function parseLogText(text) {
  return text
    .split("\n")
    .filter(Boolean)
    .map(parseLogLine);
}