import { useState } from "react";
import Table from "./Table";

function SortableTable({ data, config, addKey }) {
  const [sortState, setSortState] = useState(null);
  const [sortedByValue, setSortedByValue] = useState(null);

  const handleClickSort = (label) => {
    if (label !== sortedByValue) {
      setSortState(sortState);
    }

    if (sortState === null) {
      setSortState("asc");
      setSortedByValue(label);
    } else if (sortState === "asc") {
      setSortState("desc");
      setSortedByValue(label);
    } else {
      setSortState(null);
      setSortedByValue(null);
    }
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
