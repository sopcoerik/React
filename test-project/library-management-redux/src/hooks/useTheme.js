import { useSelector } from "react-redux";

function useTheme() {
  return useSelector((state) => state.theme.theme);
}

export { useTheme };
