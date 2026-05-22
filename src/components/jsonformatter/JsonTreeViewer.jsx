import { useState } from "react";

import JsonTreeNode
  from "./JsonTreeNode";

export default function JsonTreeViewer({
  formatted,
}) {

  const [openMap, setOpenMap] =
    useState({
      root: true,
    });

  if (!formatted) {
    return null;
  }

  let parsed;

  try {

    parsed =
      JSON.parse(formatted);

  } catch {

    return null;
  }

  const handleExpandAll = () => {

    const newMap = {};

    const walk = (
      obj,
      path = "root"
    ) => {

      newMap[path] = true;

      if (
        typeof obj === "object" &&
        obj !== null
      ) {

        Object.entries(obj)
          .forEach(
            ([key, value]) => {

              walk(
                value,
                `${path}.${key}`
              );
            }
          );
      }
    };

    walk(parsed);

    setOpenMap(newMap);
  };

  const handleCollapseAll = () => {

    setOpenMap({
      root: true,
    });
  };

  return (
    <div
      className="
        bg-zinc-900
        rounded
        p-4
        overflow-auto
      "
    >

      <div className="flex gap-2 mb-4">

        <button
          onClick={handleExpandAll}
          className="
            px-3 py-1
            rounded
            bg-green-600
            text-white
            text-sm
          "
        >
          Expand All
        </button>

        <button
          onClick={handleCollapseAll}
          className="
            px-3 py-1
            rounded
            bg-red-600
            text-white
            text-sm
          "
        >
          Collapse All
        </button>

      </div>

      <JsonTreeNode
        name="root"
        data={parsed}
        path="root"
        openMap={openMap}
        setOpenMap={setOpenMap}
      />

    </div>
  );
}