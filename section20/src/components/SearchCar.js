import { useSelector, useDispatch } from "react-redux";
import { changeSearchTerm } from "../store";

function SearchCar() {
  const dispatch = useDispatch();

  const term = useSelector((state) => state.cars.searchTerm);

  const handleSearchFieldChange = (e) => {
    dispatch(changeSearchTerm(e.target.value));
  };

  return (
    <div>
      <input value={term} onChange={handleSearchFieldChange} />
    </div>
  );
}

export default SearchCar;
