export function formatJson(text) {
  return JSON.stringify(
    JSON.parse(text),
    null,
    2
  );
}