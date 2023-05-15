import { useThemeContext } from "./hooks/useThemeContext";
import Header from "./pages/Header/Header";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";
function App() {
  const { theme } = useThemeContext();

  return (
    <div className={`${theme === "dark" ? theme : ""} h-screen`}>
      <Header />
      <AuthorsPage />
    </div>
  );
}

export default App;
