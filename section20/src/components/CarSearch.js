import { changeSearchTerm } from "../store";
import { useDispatch, useSelector } from "react-redux";

function CarSearch() {
  const dispatch = useDispatch();

  const { searchTerm } = useSelector((state) => {
    return state.cars;
  });

  const handleSearchInput = (e) => {
    dispatch(changeSearchTerm(e.target.value));
  };

  return (
    <div>
      <h4>Search among your cars:</h4>
      <input onChange={handleSearchInput} value={searchTerm} />
    </div>
  );
}

export default CarSearch;
