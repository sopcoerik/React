import { createPortal } from "react-dom";
import Button from "./Button";
import { useTheme } from "../../hooks/useTheme";
function Modal({
  headerText,
  children,
  onCancel,
  onOk,
  isOpen,
  confirmText = "Ok",
  cancelText = "Cancel",
}) {
  const theme = useTheme();

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="modal absolute z-20 -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4 bg-white border border-gray-300 rounded flex flex-col justify-around">
        <div>
          <div className="header w-full">
            <div className="flex justify-end">
              <div
                className="x-boss relative flex w-10 h-10 cursor-pointer"
                onClick={onCancel}
              >
                <div className="x absolute w-0.5 h-5 top-2/4 left-2/4 bg-gray-300 rotate-45 -translate-x-2/4 -translate-y-2/4" />
                <div className="x absolute w-0.5 h-5 top-2/4 left-2/4 bg-gray-300 -rotate-45 -translate-x-2/4 -translate-y-2/4" />
              </div>
            </div>
          </div>
        </div>
        <div className="ml-3">{headerText}</div>
        <div>{children}</div>
        <div className="flex justify-end mx-3 mb-10 gap-2">
          <Button danger onClick={onCancel}>
            {cancelText}
          </Button>
          <Button onClick={onOk}>{confirmText}</Button>
        </div>
      </div>
      <div
        className={`absolute ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        } inset-0 opacity-70 modal  overflow-hidden`}
        onClick={onCancel}
      ></div>
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
