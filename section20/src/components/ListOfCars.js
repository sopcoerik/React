import { useSelector, useDispatch } from "react-redux";
import { removeCar } from "../store";

function ListOfCars() {
  const { filteredCars: cars, name } = useSelector(
    ({ cars: { data, searchTerm }, form: { name } }) => {
      const filteredCars = data.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        filteredCars,
        name,
      };
    }
  );
  const dispatch = useDispatch();

  const handleCarDelete = (id) => {
    dispatch(removeCar(id));
  };

  const renderedCars = cars.map((car) => {
    return (
      <div key={car.id}>
        <div className="text-xl mx-10 my-2 flex justify-between">
          <p
            className={
              car.name.toLowerCase().includes(name.toLowerCase()) && name !== ""
                ? "font-bold"
                : ""
            }
          >
            {car.name} - ${car.cost}
          </p>
          <button
            className="mx-3 px-3 py-1 bg-gray-700 text-white"
            onClick={() => handleCarDelete(car.id)}
          >
            Delete Car
          </button>
        </div>
      </div>
    );
  });

  return <div> {renderedCars} </div>;
}

export default ListOfCars;
