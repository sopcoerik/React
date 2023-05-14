import React from "react";
import ReactDOM from "react-dom/client";
import Provider from "./contexts/booksContext";
import AuthorsProvider from "./contexts/authorsContext";
import ThemeProvider from "./contexts/themeContext";

import App from "./App";

import "./index.css";

const el = document.querySelector("#root");
const root = ReactDOM.createRoot(el);

root.render(
  <ThemeProvider>
    <AuthorsProvider>
      <Provider>
        <App />
      </Provider>
    </AuthorsProvider>
  </ThemeProvider>
);
