import {
  addCar,
  removeCar,
  carsReducer,
  changeSearchTerm,
} from "./slices/carsSlice";
import { changeName, changeCost, formReducer } from "./slices/formSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    form: formReducer,
  },
});

export { store, addCar, removeCar, changeSearchTerm, changeCost, changeName };
