import Dropdown from "../components/Dropdown";

function DropdownPage() {
  const options = [
    { text: "Red", key: "red" },
    { text: "Green", key: "green" },
    { text: "Blue", key: "blue" },
  ];

  return <Dropdown options={options} />;
}

export default DropdownPage;
