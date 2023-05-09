import AddCarForm from "./components/AddCarForm";
import ListOfCars from "./components/ListOfCars";
import SearchCar from "./components/SearchCar";
import TotalValueOfCars from "./components/TotalValueOfCars";

function App() {
  return (
    <div>
      <label>Add a car:</label>
      <AddCarForm />
      <hr />
      <label>Search in Owned Cars:</label>
      <SearchCar />
      <hr />
      <label>List of Owned Cars:</label>
      <ListOfCars />
      <hr />
      <label>Total Value of Cars:</label>
      <TotalValueOfCars />
    </div>
  );
}

export default App;
