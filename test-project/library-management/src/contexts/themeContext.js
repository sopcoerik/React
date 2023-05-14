import { createContext, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const handleDarkTheme = () => {
    !isDark && document.body.classList.add("dark");
    isDark && document.body.classList.remove("dark");
    setIsDark(!isDark);
  };

  const ThemeValue = {
    handleDarkTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={ThemeValue}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
