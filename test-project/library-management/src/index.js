import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ThemeProvider from "./contexts/themeContext";

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
      <ThemeProvider>
        <App />
      </ThemeProvider>
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
