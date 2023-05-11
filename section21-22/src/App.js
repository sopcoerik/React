import Button from "./components/Button";
import ListUsers from "./components/ListUsers";

import Panel from "./components/Panel";

function App() {
  return (
    <div className="container mx-auto">
      <Panel>
        <ListUsers />
      </Panel>
    </div>
  );
}

export default App;
