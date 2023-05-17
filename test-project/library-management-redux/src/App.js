import { Outlet } from "react-router-dom";
import Header from "./pages/Header/Header";
import { useThemeContext } from "./hooks/useThemeContext";

function App() {
  const { theme } = useThemeContext();
  return (
    <div className={`bg-slate-100 h-screen ${theme ? theme : ""}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
