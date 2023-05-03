import { useSelector, useDispatch } from "react-redux";
import { removeCar } from "../store";

function CarList() {
  const dispatch = useDispatch();
  const { data, name } = useSelector(({ form, cars: { data, searchTerm } }) => {
    const searchedCars = data.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      data: searchedCars,
      name: form.name,
    };
  });

  const handleCarRemoval = (id) => {
    dispatch(removeCar(id));
  };

  const renderedCars = data.map((car) => {
    const isBold = name && car.name.toLowerCase().includes(name.toLowerCase());
    return (
      <div key={car.id} className={`${isBold && "bold"}`}>
        <div>{car.name}</div>
        <div>${car.cost}</div>
        <button onClick={() => handleCarRemoval(car.id)}>Remove</button>
      </div>
    );
  });

  return <div>{renderedCars}</div>;
}

export default CarList;
