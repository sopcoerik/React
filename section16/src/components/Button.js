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
    "bg-red-500 border-red-600": danger && !outlined,
    "bg-yellow-500 border-yellow-600": warning && !outlined,
    "bg-green-400 border-green-500": success && !outlined,
    "bg-gray-700 border-gray-900": secondary && !outlined,
    "bg-blue-400 border-blue-500": primary && !outlined,
    "text-white":
      !outlined && (warning || danger || success || secondary || primary),
    "rounded-full": rounded,
    "bg-white": outlined,
    "text-red-500 border-red-600": outlined && danger,
    "text-yellow-500 border-yellow-600": outlined && warning,
    "text-blue-400 border-blue-500": outlined && primary,
    "text-gray-700 border-gray-900": outlined && secondary,
    "text-green-400 border-green-500": outlined && success,
  });

  return (
    <button {...rest} className={usedClasses}>
      {children}
    </button>
  );
}

export default Button;
