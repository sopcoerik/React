import classNames from "classnames";

function Button({
  children,
  rounded,
  outlined,
  primary,
  danger,
  className,
  pill,
  icon = "",
  ...props
}) {
  const buttonClass = classNames(
    "border",
    "py-1",
    "px-3",
    "bg-blue-300 text-white hover:bg-blue-400",
    {
      "rounded-full": pill,
      "rounded-md": rounded,
      "bg-transparent text-blue-300": outlined && primary,
      "bg-transparent text-red-300": outlined && danger,
      "bg-red-300 text-white hover:bg-red-400": danger && !outlined,
    },
    className
  );

  return (
    <button className={`${buttonClass} flex items-center gap-2`} {...props}>
      {icon}
      {children}
    </button>
  );
}

export default Button;
