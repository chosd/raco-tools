export function minifyJson(text) {

  const parsed =
    JSON.parse(text);

  return JSON.stringify(parsed);
}