import { createPortal } from "react-dom";
import { useTheme } from "../../hooks/useTheme";

function Modal({ children, setModal }) {
  const theme = useTheme();

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal")) {
      setModal(false);
    }
  };

  return createPortal(
    <div
      className={`absolute ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } inset-0 opacity-70 modal  overflow-hidden`}
      onClick={handleModalClick}
    >
      {children}
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
