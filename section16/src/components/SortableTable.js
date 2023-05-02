import { useState } from "react";
import Table from "./Table";

function SortableTable({ data, config, addKey }) {
  const [sortState, setSortState] = useState(null);
  const [sortedByValue, setSortedByValue] = useState(null);

  const handleClickSort = (label) => {
    if (label !== sortedByValue) {
      setSortState(sortState);
    }

    sortState === null
      ? setSortState("asc")
      : sortState === "asc"
      ? setSortState("desc")
      : setSortState(null);

    setSortedByValue(label);
  };

  const sortedData = data.sort((a, b) => {
    if (sortedByValue === "Name") {
      return sortState === "asc"
        ? a.name.localeCompare(b.name)
        : sortState === "desc"
        ? b.name.localeCompare(a.name)
        : null;
    } else if (sortedByValue === "Score") {
      return sortState === "asc"
        ? a.score - b.score
        : sortState === "desc"
        ? b.score - a.score
        : null;
    }
  });

  return (
    <div>
      <Table
        data={sortedData}
        config={config}
        addKey={addKey}
        handleClickSort={handleClickSort}
        sortState={sortState}
      />
    </div>
  );
}

export default SortableTable;
