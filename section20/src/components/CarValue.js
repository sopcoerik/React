import { useSelector } from "react-redux";

function CarValue() {
  const total = useSelector(({ cars: { data, searchTerm } }) =>
    data
      .filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .reduce((acc, car) => acc + Number(car.cost), 0)
  );

  return <div>Total: ${total}</div>;
}

export default CarValue;
