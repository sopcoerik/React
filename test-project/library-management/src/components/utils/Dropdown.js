import { useReducer } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";

function Dropdown({
  options,
  setSelectedAuthor,
  setSelectedCategory,
  category,
  author,
}) {
  const OPEN_DROPDOWN = "open_dropdown";
  const CHANGE_HEADER = "change_header";
  const CHANGE_ALL = "change_all_state";

  const { theme } = useThemeContext();

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
    header:
      (author && "Available authors...") ||
      (category && "Available categories..."),
  });

  const handleDropdownClick = () => {
    dispatch({
      type: OPEN_DROPDOWN,
      payload: !state.isOpen,
    });
  };

  const handleOptionClick = (option) => {
    setSelectedCategory
      ? setSelectedCategory(option)
      : setSelectedAuthor(option);

    dispatch({
      type: CHANGE_ALL,
      payload: {
        isOpen: false,
        header: option.name,
      },
    });
  };

  const availableOptions = options.map((option) => (
    <div
      key={option.id}
      onClick={() => handleOptionClick(option)}
      className="hover:bg-slate-300"
    >
      {option.name}
    </div>
  ));

  return (
    <div className="relative border rounded border-slate-200 py-3 hover:cursor-pointer w-full">
      <div onClick={handleDropdownClick} className="px-1">
        {state.header}
      </div>
      {state.isOpen && (
        <div
          className={`absolute ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } w-full border rounded border-slate-200 px-1 py-3`}
        >
          {availableOptions}
        </div>
      )}
    </div>
  );
}
export default Dropdown;
