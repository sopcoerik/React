import AuthorForm from "../authors/AuthorForm";

function Modal({ toEdit, navigate }) {
  return (
    <div className="absolute bg-gray-300 top-0 left-0 w-full h-full opacity-80">
      <div className="absolute bg-white -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4">
        {toEdit && <AuthorForm toEdit={toEdit} navigate={navigate} />}
        {!toEdit && <AuthorForm navigate={navigate} />}
      </div>
    </div>
  );
}

export default Modal;
