import { useTheme } from "../../hooks/useTheme";

function Input({
  name,
  label,
  type,
  error,
  value,
  onInputChange,
  invalid,
  className,
  field,
  form,
  ...props
}) {
  const theme = useTheme();

  console.log(field, form, props);

  const inputErrorClassNames = `${invalid && "border border-red-300"}`;

  const inputClassNames = ` ${
    theme === "dark" ? theme : "bg-inherit text-black"
  }  outline-none`;

  return (
    <div>
      <div>
        <label className="text-lg font-bold">{label}</label>
      </div>
      <div>
        <input
          name={name}
          type={type}
          onChange={onInputChange}
          value={value}
          className={`${className + inputClassNames}, ${inputErrorClassNames}`}
        />
      </div>
      {error && (
        <div>
          <p className="text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}

export default Input;
