import { useState } from "react";

function Dropdown({ options, selectedAuthor, setSelectedAuthor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [header, setHeader] = useState("Available authors...");

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedAuthor(option);
    setHeader(option.name);
    setIsOpen(false);
  };

  const availableOptions = options.map((option) => (
    <div key={option.id} onClick={() => handleOptionClick(option)}>
      {option.name}
    </div>
  ));

  return (
    <div className="relative">
      <div onClick={handleDropdownClick}>{header}</div>
      {isOpen && (
        <div className="absolute bg-white w-48">{availableOptions}</div>
      )}
    </div>
  );
}
export default Dropdown;
