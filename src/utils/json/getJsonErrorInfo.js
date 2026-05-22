export function getJsonErrorInfo(
  text,
  error
) {

  const match =
    error.message.match(
      /position (\d+)/
    );

  if (!match) {

    return {
      message: error.message,
    };
  }

  const position =
    Number(match[1]);

  const lines =
    text.substring(0, position)
      .split("\n");

  const line =
    lines.length;

  const column =
    lines[
      lines.length - 1
    ].length + 1;

  return {
    message: error.message,
    line,
    column,
  };
}