import { useState } from "react";

import Layout from "../components/common/Layout";

import JsonViewer
  from "../components/jsonformatter/JsonViewer";

import JsonTreeViewer
  from "../components/jsonformatter/JsonTreeViewer";

import { formatJson }
  from "../utils/json/formatJson";

import { minifyJson }
  from "../utils/json/minifyJson";

import { getJsonErrorInfo }
  from "../utils/json/getJsonErrorInfo";

export default function JsonFormatterPage() {

  const [input, setInput] =
    useState("");

  const [formatted, setFormatted] =
    useState("");

  const [error, setError] =
    useState(null);

  const [cursorPos, setCursorPos] =
    useState({
      line: 1,
      col: 1,
    });
  
  const updateCursorPosition = (
    e
  ) => {

    const text =
      e.target.value;

    const position =
      e.target.selectionStart;

    const lines =
      text.substring(0, position)
        .split("\n");

    const line =
      lines.length;

    const col =
      lines[
        lines.length - 1
      ].length + 1;

    setCursorPos({
      line,
      col,
    });
  };
  const handleFormat = () => {

    try {

      const result =
        formatJson(input);

      setFormatted(result);

      setError("");

    } catch (err) {

      setFormatted("");

      setError(
        getJsonErrorInfo(
            input,
            err
        )
      );
    }
  };

  const handleMinify = () => {
    try {

        const result =
        minifyJson(input);

        setFormatted(result);

        setError("");

    } catch (err) {

        setFormatted("");

        setError(
            getJsonErrorInfo(
            input,
            err
            )
        );
    }
  };
  const handleCopy = async () => {

    if (!formatted) {
      return;
    }

    await navigator.clipboard.writeText(
      formatted
    );

    alert("복사 완료");
  };

  return (
    <Layout>

      <div className="flex flex-col gap-4">

        <h2 className="text-2xl font-bold">
          JSON Formatter
        </h2>

        <textarea
          value={input}
          onChange={(e) =>{
            setInput(e.target.value);
            updateCursorPosition(e);
          }}
          onClick={updateCursorPosition}
          onKeyUp={updateCursorPosition}
          placeholder="JSON 입력"
          className="
            h-64
            p-4
            rounded
            bg-zinc-900
            text-white
            font-mono
          "
        />

        <div
          className="
            text-xs
            text-zinc-400
            font-mono
          "
        >
          Line:
          {" "}
          {cursorPos.line}

          {" | "}

          Col:
          {" "}
          {cursorPos.col}
        </div>

        <div className="flex gap-2">

          <button
            onClick={handleFormat}
            className="
              px-4 py-2
              rounded
              bg-blue-600
              text-white
            "
          >
            Format
          </button>

          <button
            onClick={handleMinify}
            className="
                px-4 py-2
                rounded
                bg-purple-600
                text-white
            "
            >
            Minify
          </button>

          <button
            onClick={handleCopy}
            className="
              px-4 py-2
              rounded
              bg-zinc-700
              text-white
            "
          >
            Copy
          </button>

        </div>

        {error && (
            <div
                className="
                bg-red-900/30
                border border-red-500
                rounded
                p-3
                text-red-300
                font-mono
                text-sm
                "
            >

                <div>
                {error.message}
                </div>

                {error.line && (
                <div className="mt-1">

                    Line:
                    {" "}
                    {error.line}

                    {" | "}

                    Column:
                    {" "}
                    {error.column}

                </div>
                )}

            </div>
            )}

        <JsonViewer formatted={formatted} />
        <JsonTreeViewer formatted={formatted} />

      </div>

    </Layout>
  );
}