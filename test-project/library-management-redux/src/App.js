import { Outlet } from "react-router-dom";
import Header from "./pages/Header/Header";
// import { useThemeContext } from "./hooks/useThemeContext";
import { useTheme } from "./hooks/useTheme";

function App() {
  // const { theme } = useThemeContext();
  const theme = useTheme();

  return (
    <div
      className={`bg-slate-100 h-screen ${theme === "dark" ? "bg-black" : ""}`}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
