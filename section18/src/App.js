import AccordeonPage from "./pages/AccordeonPage";
import ButtonsPage from "./pages/ButtonsPage";
import DropdownPage from "./pages/DropdownPage";
import Route from "./components/Route";
import Sidebar from "./components/Sidebar";
import ModalPage from "./pages/ModalPage";
import TablePage from "./pages/TablePage";
import CounterPage from "./pages/CounterPage";

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
      <Route path="/modal">
        <ModalPage />
      </Route>
      <Route path="/table">
        <TablePage />
      </Route>
      <Route path="/counter">
        <CounterPage initialCount={10} />
      </Route>
    </div>
  );
}

export default App;
