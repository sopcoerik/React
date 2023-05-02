import classNames from "classnames";

function Button({
  children,
  rounded,
  outlined,
  danger,
  warning,
  success,
  secondary,
  primary,
  className,
  ...rest
}) {
  const usedClasses = classNames(className, "border py-2 px-5 m-3 w-48", {
    "bg-red-500 border-red-600 text-white": danger,
    "bg-yellow-500 border-yellow-600 text-white": warning,
    "bg-green-400 border-green-500 text-white": success,
    "bg-gray-700 border-gray-900 text-white": secondary,
    "bg-blue-400 border-blue-500 text-white": primary,
    "rounded-full": rounded,
    "bg-white": outlined,
    "text-red-500": outlined && danger,
    "text-yellow-500": outlined && warning,
    "text-blue-400": outlined && primary,
    "text-gray-700": outlined && secondary,
    "text-green-400": outlined && success,
  });

  return (
    <button {...rest} className={usedClasses}>
      {children}
    </button>
  );
}

export default Button;
