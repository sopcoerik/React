import { createPortal } from "react-dom";
import Form from "../utils/Form";
import { useBooksContext } from "../../hooks/useBooksContext";

function AddBookModal({ isOpen, book, setIsEdited }) {
  const { setModalIsOpen } = useBooksContext();

  if (!isOpen) {
    return null;
  }

  const handleCancelForm = (e) => {
    if (
      e.target.classList.contains("bg-gray-300") ||
      e.target.classList.contains("m-2")
    ) {
      setIsEdited ? setIsEdited(false) : setModalIsOpen(false);
    }
  };

  return createPortal(
    <div
      className="absolute bg-gray-300 top-0 left-0 w-full h-full"
      onClick={handleCancelForm}
    >
      <Form
        book={book}
        setIsEdited={setIsEdited}
        handleCancelForm={handleCancelForm}
      />
    </div>,
    document.getElementById("modal-root")
  );
}

export default AddBookModal;
