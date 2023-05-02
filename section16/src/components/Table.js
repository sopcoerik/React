import { GoChevronUp, GoChevronDown } from "react-icons/go";

function Table({ data, config, addKey, handleClickSort, sortState }) {
  const arrows = () => {
    if (sortState === "asc")
      return (
        <div>
          <GoChevronDown />
        </div>
      );
    else if (sortState === "desc")
      return (
        <div>
          <GoChevronUp />
        </div>
      );
    else {
      return (
        <div>
          <GoChevronUp />
          <GoChevronDown />
        </div>
      );
    }
  };
  return (
    <table>
      <thead>
        <tr className="border-b-2">
          {config.map((item) => {
            if (item.sortValue) {
              return (
                <th
                  key={item.label}
                  onClick={() => handleClickSort(String(item.label))}
                  className="cursor-pointer hover:bg-gray-100 py-2 px-3 flex justify-between"
                >
                  {arrows()}
                  {item.label}
                </th>
              );
            } else return <th key={item.label}>{item.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData) => {
          return (
            <tr key={addKey()} className="border-b">
              {config.map((configItem) => configItem.render(rowData))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
