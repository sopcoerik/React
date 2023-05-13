import { createPortal } from "react-dom";
import AuthorForm from "./AddAuthorForm";

function AddAuthorModal({ isOpen, close, inputToEdit }) {
  if (!isOpen) return null;

  const handleModalClose = (e) => {
    if (e.target.classList.contains("bg-gray-300")) close(false);
  };

  return createPortal(
    <div
      className="absolute bg-gray-300 top-0 left-0 w-full h-full"
      onClick={handleModalClose}
    >
      <AuthorForm close={close} inputToEdit={inputToEdit} />
    </div>,
    document.getElementById("modal-root")
  );
}

export default AddAuthorModal;
