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

import "./index.css";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LoginPage/LoginPage";
import UserPage from "./pages/UserPage/UserPage";
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
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
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LogInPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/detail",
        element: <BookDetailPage />,
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
