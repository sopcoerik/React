import { configureStore } from "@reduxjs/toolkit";

import { authorsApi } from "./apis/authorsApi";
import { booksApi } from "./apis/booksApi";
import { categoriesApi } from "./apis/categoriesApi";
import { usersApi } from "./apis/usersApi";
import { reviewsApi } from "./apis/reviewsApi";

import { ThemeReducer } from "./slices/themeSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { ActiveUserReducer } from "./slices/activeUserSlice";

const store = configureStore({
  reducer: {
    activeUser: ActiveUserReducer,
    theme: ThemeReducer,
    [authorsApi.reducerPath]: authorsApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authorsApi.middleware)
      .concat(booksApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(usersApi.middleware)
      .concat(reviewsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };

export * from "./apis/authorsApi";
export * from "./apis/booksApi";
export * from "./apis/categoriesApi";
export * from "./apis/usersApi";
export * from "./apis/reviewsApi";
export { setTheme } from "./slices/themeSlice";
export { addActiveUser } from "./slices/activeUserSlice";
