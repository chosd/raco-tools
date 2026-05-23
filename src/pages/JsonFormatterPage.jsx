import { useState } from "react";

import Layout from "../components/common/Layout";

import Card
  from "../components/common/Card";

import JsonViewer
  from "../components/jsonformatter/JsonViewer";

import JsonTreeViewer
  from "../components/jsonformatter/JsonTreeViewer";

import Toast
  from "../components/common/Toast";

import Button
  from "../components/common/Button";

import Textarea
  from "../components/common/Textarea";

import { useToast }
  from "../hooks/useToast";

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

  const {
    toast,
    showToast,
  } = useToast();

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

      showToast(
        "JSON 포맷 완료",
        "success"
      );

    } catch (err) {

      setFormatted("");

      setError(
        getJsonErrorInfo(
          input,
          err
        )
      );

      showToast(
        "JSON 파싱 실패",
        "error"
      );
    }
  };

  const handleMinify = () => {

    try {

      const result =
        minifyJson(input);

      setFormatted(result);

      setError("");

      showToast(
        "JSON 압축 완료",
        "success"
      );

    } catch (err) {

      setFormatted("");

      setError(
        getJsonErrorInfo(
          input,
          err
        )
      );

      showToast(
        "JSON 파싱 실패",
        "error"
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

    showToast(
      "복사 완료",
      "success"
    );
  };

  return (
    <Layout>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}

      <div className="flex flex-col gap-4">

        <h2 className="text-2xl font-bold">
          JSON Formatter
        </h2>

        <Card>

          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              updateCursorPosition(e);
            }}
            onClick={updateCursorPosition}
            onKeyUp={updateCursorPosition}
            placeholder="JSON 입력"
          />

          <div
            className="
              mt-2
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

        </Card>

        <Card>

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            <Button onClick={handleFormat}>
              Format
            </Button>

            <Button
              variant="secondary"
              onClick={handleMinify}
            >
              Minify
            </Button>

            <Button
              variant="success"
              onClick={handleCopy}
            >
              Copy
            </Button>

          </div>

        </Card>

        {error && (

          <Card
            className="
              border-red-500
              bg-red-900/20
            "
          >

            <div
              className="
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

          </Card>
        )}

        <Card>

          <JsonViewer
            formatted={formatted}
          />

        </Card>

        <Card>

          <JsonTreeViewer
            formatted={formatted}
          />

        </Card>

      </div>

    </Layout>
  );
}