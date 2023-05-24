import { createPortal } from "react-dom";
import Button from "./Button";
function Modal({
  headerText,
  children,
  onCancel,
  onOk,
  isOpen,
  confirmText,
  cancelText,
}) {
  return (
    isOpen &&
    createPortal(
      <div className="modal absolute z-20 -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4 bg-white border border-gray-300 rounded flex flex-col justify-around">
        <div className="mb-10 ml-3">{headerText}</div>
        <div>{children}</div>
        <div className="flex justify-end mx-3 mb-10 gap-2">
          <Button danger onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onOk}>Ok</Button>
        </div>
      </div>,
      document.getElementById("modal-root")
    )
  );
}

export default Modal;
