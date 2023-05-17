import { createPortal } from "react-dom";
import { useThemeContext } from "../../hooks/useThemeContext";

function Modal({ children, setModal }) {
  const { theme } = useThemeContext();

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal")) {
      setModal(false);
    }
  };

  return createPortal(
    <div
      className={`absolute ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } inset-0 opacity-70 modal`}
      onClick={handleModalClick}
    >
      {children}
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
