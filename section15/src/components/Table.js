function Table({ data, config, addKey }) {
  return (
    <table>
      <thead>
        <tr className="border-b-2">
          {config.map((item) => (
            <th key={item.label}>{item.label}</th>
          ))}
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
