import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ThemeProvider from "./contexts/themeContext";
import { Provider } from "react-redux";

import { store } from "./store";

import App from "./App";
import BooksPage from "./pages/BooksPage/BooksPage";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import NewPage from "./pages/NewPage/NewPage";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    ),

    children: [
      {
        path: "/",
        element: <BooksPage />,
      },
      {
        path: "/authors",
        element: <AuthorsPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/newpage",
        element: <NewPage />,
      },
    ],
  },
]);

const el = document.querySelector("#root");
const root = ReactDOM.createRoot(el);

root.render(
  <RouterProvider router={router}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </RouterProvider>
);
