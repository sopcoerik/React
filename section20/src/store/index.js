import { configureStore } from "@reduxjs/toolkit";

import { changeName, changeCost, formReducer } from "./slices/formSlice";
import {
  addCar,
  removeCar,
  changeSearchTerm,
  carReducer,
} from "./slices/carSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    cars: carReducer,
  },
});

export { store, changeName, changeCost, addCar, removeCar, changeSearchTerm };
