import { useState } from "react";

import Button
  from "../common/Button";

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
        overflow-auto
      "
    >

      <div className="flex gap-2 mb-4">

        <Button
          size="sm"
          variant="success"
          onClick={handleExpandAll}
        >
          Expand All
        </Button>

        <Button
          size="sm"
          variant="danger"
          onClick={handleCollapseAll}
        >
          Collapse All
        </Button>

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