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
    `${!danger ? "bg-blue-500" : ""} hover:bg-blue-300 text-white `,
    {
      "rounded-full": pill,
      "rounded-md": rounded,
      "bg-transparent text-blue-300": outlined && primary,
      "bg-transparent text-red-300": outlined && danger,
      "bg-red-500 hover:bg-red-300": danger && !outlined,
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
