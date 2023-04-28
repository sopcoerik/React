import { useState } from "react";

function Dropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelected = (newSelected) => {
    setIsOpen(!isOpen);
    setSelectedOption(newSelected);
  };

  const renderedOptions = options.map((option) => (
    <div
      onClick={() => handleSelected(option.text)}
      key={option.key}
      className="border-b border-gray-50 text-base"
    >
      {option.text}
    </div>
  ));

  let content = selectedOption ? selectedOption : "Dropdown";

  return (
    <div className="border border-gray-200 px-1 py-0.5 w-56 text-center">
      <div onClick={handleClick} className="text-2xl">
        {content}
      </div>
      {isOpen ? renderedOptions : null}
    </div>
  );
}

export default Dropdown;
