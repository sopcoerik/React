import { useTheme } from "../../hooks/useTheme";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";

function Input({ name, label, type, className = "", row, as }) {
  const theme = useTheme();

  const classesFromUsers = classNames(
    className,
    {
      dark: theme === "dark",
      "bg-inherit text-black outline-none": theme === "light",
    },
    "w-full"
  );

  return (
    <div className={`${row && "flex items-center"} w-full`}>
      <div>
        <label className="text-base font-bold">{label}</label>
      </div>

      <div>
        <Field name={name} type={type} as={as}>
          {({ field, meta }) => (
            <div>
              <input
                type={type ? type : ""}
                name={name}
                {...field}
                className={`${
                  meta.error && "border border-red-300"
                } ${classesFromUsers}`}
              />
            </div>
          )}
        </Field>
      </div>

      <div>
        <ErrorMessage
          name={`${name}`}
          render={(message) => <p className="text-red-300">{message}</p>}
        />
      </div>
    </div>
  );
}

export default Input;
