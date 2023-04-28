import AccordeonPage from "./pages/AccordeonPage";
import ButtonsPage from "./pages/ButtonsPage";
import DropdownPage from "./pages/DropdownPage";
import Route from "./components/Route";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Route path="/">
        <DropdownPage />
      </Route>
      <Route path="/accordeon">
        <AccordeonPage />
      </Route>
      <Route path="/buttons">
        <ButtonsPage />
      </Route>
    </div>
  );
}

export default App;
