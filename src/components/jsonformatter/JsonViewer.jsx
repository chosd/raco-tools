import { useEffect, useRef } from "react";

import Prism from "prismjs";

import "prismjs/components/prism-json";

export default function JsonViewer({
  formatted,
}) {

  const codeRef = useRef(null);

  useEffect(() => {

    if (codeRef.current) {
      Prism.highlightElement(
        codeRef.current
      );
    }

  }, [formatted]);

  return (
    <pre
      className="
        line-numbers
        rounded
        overflow-auto
        bg-[var(--color-bg)]
        p-4
        text-sm
      "
    >
      <code
        ref={codeRef}
        className="language-json"
      >
        {formatted}
      </code>
    </pre>
  );
}