import Dropdown from "./components/Dropdown";

function App() {
  const options = [
    { text: "Red", key: "red" },
    { text: "Green", key: "green" },
    { text: "Blue", key: "blue" },
  ];

  return <Dropdown options={options} />;
}

export default App;
