export function formatJson(text) {

  const parsed =
    JSON.parse(text);

  return JSON.stringify(
    parsed,
    null,
    2
  );
}