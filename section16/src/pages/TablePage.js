import SortableTable from "../components/SortableTable";

function TablePage() {
  const data = [
    { name: "watermelon", color: "bg-red-500", score: 10 },
    { name: "orange", color: "bg-orange-400", score: 8 },
    { name: "grapes", color: "bg-purple-400", score: 9 },
  ];

  const config = [
    {
      label: "Name",
      render: (obj) => (
        <td key={addKey()} className="p-3">
          {obj.name}
        </td>
      ),
      sortValue: (obj) => obj.name,
    },
    {
      label: "Color",
      render: (obj) => (
        <td className="p-3" key={addKey()}>
          <div className={`${obj.color} p-3 m-2`}></div>
        </td>
      ),
    },
    {
      label: "Score",
      render: (obj) => (
        <td className="p-3" key={addKey()}>
          {obj.score}
        </td>
      ),
      sortValue: (obj) => obj.score,
    },
  ];

  const addKey = () => {
    return Math.floor(Math.random() * 99999);
  };

  return (
    <div>
      <SortableTable data={data} config={config} addKey={addKey} />
    </div>
  );
}

export default TablePage;
