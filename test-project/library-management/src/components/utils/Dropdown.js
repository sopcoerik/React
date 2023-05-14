import { useReducer } from "react";

function Dropdown({ options, setSelectedAuthor }) {
  const OPEN_DROPDOWN = "open_dropdown";
  const CHANGE_HEADER = "change_header";
  const CHANGE_ALL = "change_all_state";

  const dropdownReducer = (state, action) => {
    switch (action.type) {
      case OPEN_DROPDOWN:
        return {
          isOpen: action.payload,
          header: state.header,
        };
      case CHANGE_HEADER:
        return {
          isOpen: state.isOpen,
          header: action.payload,
        };
      case CHANGE_ALL:
        return {
          isOpen: action.payload.isOpen,
          header: action.payload.header,
        };
      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(dropdownReducer, {
    isOpen: false,
    header: "Available authors...",
  });

  const handleDropdownClick = () => {
    dispatch({
      type: OPEN_DROPDOWN,
      payload: !state.isOpen,
    });
  };

  const handleOptionClick = (option) => {
    setSelectedAuthor(option);

    dispatch({
      type: CHANGE_ALL,
      payload: {
        isOpen: false,
        header: option.name,
      },
    });
  };

  const availableOptions = options.map((option) => (
    <div key={option.id} onClick={() => handleOptionClick(option)}>
      {option.name}
    </div>
  ));

  return (
    <div className="relative">
      <div onClick={handleDropdownClick}>{state.header}</div>
      {state.isOpen && (
        <div className="absolute bg-white w-48">{availableOptions}</div>
      )}
    </div>
  );
}
export default Dropdown;
