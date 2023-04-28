import { useState } from "react";

function Accordeon({ options }) {
  const [selectedOption, setSelectedOption] = useState(-1);

  const handleSelect = (newOption) => {
    if (newOption === selectedOption) setSelectedOption(-1);
    else setSelectedOption(newOption);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div key={option.id} className="accordeon">
        <h3 onClick={() => handleSelect(option)} className="accordeon-header">
          {option.header}
        </h3>
        {option === selectedOption ? (
          <p className="accordeon-content">{option.text}</p>
        ) : (
          false
        )}
      </div>
    );
  });

  return <div className="accordeon-container">{renderedOptions}</div>;
}

export default Accordeon;
