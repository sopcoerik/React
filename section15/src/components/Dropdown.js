import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
function Dropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const divEl = useRef();

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
      className="border-b border-gray-50 text-xl cursor-pointer"
    >
      {option.text}
    </div>
  ));

  let content = selectedOption ? selectedOption : "Select...";

  return (
    <div className="mx-10 mt-5">
      <div ref={divEl} className="w-56">
        <h1 className="text-4xl mx-7 my-5">Dropdown</h1>
        <div className="border border-gray-200 px-1 py-0.5 w-56 text-center">
          <div
            onClick={handleClick}
            className="text-2xl cursor-pointer flex justify-between items-center"
          >
            {content} <GoChevronDown />
          </div>
          {isOpen ? renderedOptions : null}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
