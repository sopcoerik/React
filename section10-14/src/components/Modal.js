import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ handleClose }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        className="fixed inset-0 bg-gray-300 opacity-80"
        onClick={handleClose}
      ></div>
      <div className="fixed inset-40 p-10 bg-white">
        <h3 className="">Please accept the agreements</h3>
        <button
          className="py-1 px-3 bg-blue-400 border-blue-500 text-white"
          onClick={handleClose}
        >
          I accept
        </button>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
