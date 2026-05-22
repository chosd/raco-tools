export default function JsonTreeNode({
  data,
  name,
  level = 0,
  path,
  openMap,
  setOpenMap,
}) {

  const isObject =
    typeof data === "object" &&
    data !== null;

  const open =
    openMap[path] ?? false;

  const toggle = () => {

    setOpenMap((prev) => ({
      ...prev,
      [path]: !open,
    }));
  };

  if (!isObject) {

    return (
      <div
        style={{
          paddingLeft:
            `${level * 16}px`,
        }}
        className="font-mono text-sm"
      >

        <span className="text-cyan-400">
          {name}
        </span>

        <span className="text-zinc-400">
          :{" "}
        </span>

        <span className="text-green-400">
          {JSON.stringify(data)}
        </span>

      </div>
    );
  }

  const entries =
    Object.entries(data);

  return (
    <div
      style={{
        paddingLeft:
          `${level * 16}px`,
      }}
      className="font-mono text-sm"
    >

      <div
        className="
          cursor-pointer
          select-none
          text-yellow-400
        "
        onClick={toggle}
      >
        {open ? "▼" : "▶"} {name}
      </div>

      {open && (
        <div className="mt-1">

          {entries.map(
            ([key, value]) => (

              <JsonTreeNode
                key={key}
                name={key}
                data={value}
                level={level + 1}
                path={`${path}.${key}`}
                openMap={openMap}
                setOpenMap={setOpenMap}
              />
            )
          )}

        </div>
      )}

    </div>
  );
}