import { useSelector } from "react-redux";

function TotalValueOfCars() {
  const total = useSelector((state) => {
    const filteredCarsPrice = state.cars.data
      .filter((car) =>
        car.name.toLowerCase().includes(state.cars.searchTerm.toLowerCase())
      )
      .reduce((acc, car) => acc + car.cost, 0);

    return filteredCarsPrice;
  });

  return <div className="ml-5 text-xl">${total}</div>;
}

export default TotalValueOfCars;
