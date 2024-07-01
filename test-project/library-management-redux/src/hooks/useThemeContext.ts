import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

export function useThemeContext() {
  return useContext(ThemeContext);
}
