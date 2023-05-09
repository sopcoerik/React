import { changeName, changeCost, addCar } from "../store";
import { useDispatch, useSelector } from "react-redux";

function AddCarForm() {
  const { name, cost } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const handleNameInputChange = (e) => {
    dispatch(changeName(e.target.value));
  };

  const handleCostInputChange = (e) => {
    dispatch(changeCost(Number(e.target.value)));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addCar({ name, cost }));
  };

  return (
    <div className="m-3">
      <form onSubmit={handleFormSubmit}>
        <label>Name: </label>
        <input
          value={name}
          onChange={handleNameInputChange}
          className="mr-10"
        />
        <label>Cost: </label>
        <input
          value={cost || ""}
          type="number"
          onChange={handleCostInputChange}
        />
        <button className="mx-3 px-3 py-1 bg-gray-700 text-white">
          Add Car to List
        </button>
      </form>
    </div>
  );
}

export default AddCarForm;
