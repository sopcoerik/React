import { useSelector, useDispatch } from "react-redux";
import { changeName, changeCost, addCar } from "../store";

function CarForm() {
  const dispatch = useDispatch();

  const { name, cost } = useSelector((state) => {
    return state.form;
  });

  const handleNameChange = (e) => {
    dispatch(changeName(e.target.value));
  };

  const handleCostChange = (e) => {
    dispatch(changeCost(e.target.value));
  };

  const handleAddCar = (e) => {
    e.preventDefault();
    dispatch(addCar({ name, cost }));
  };

  return (
    <div>
      <h3>Add a car to your list of cars:</h3>
      <form onSubmit={handleAddCar}>
        <input onChange={handleNameChange} value={name} />
        <input
          onChange={handleCostChange}
          value={cost || ""}
          type="number"
          className="input"
        />
        <button>Add car</button>
      </form>
    </div>
  );
}

export default CarForm;
