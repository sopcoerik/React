import { configureStore } from "@reduxjs/toolkit";

import { authorsApi } from "./apis/authorsApi";
import { booksApi } from "./apis/booksApi";
import { categoriesApi } from "./apis/categoriesApi";
import { usersApi } from "./apis/usersApi";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    [authorsApi.reducerPath]: authorsApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authorsApi.middleware)
      .concat(booksApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(usersApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };

export * from "./apis/authorsApi";
export * from "./apis/booksApi";
export * from "./apis/categoriesApi";
export * from "./apis/usersApi";
