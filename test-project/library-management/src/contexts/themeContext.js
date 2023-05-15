import { createContext, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const ThemeValue = {
    handleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={ThemeValue}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
