import { Link } from "react-router-dom";
import { useThemeContext } from "../../hooks/useThemeContext";
import { FaCloudMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";

function Header() {
  const { theme, handleTheme } = useThemeContext();

  const handleThemeChange = () => {
    handleTheme();
  };

  return (
    <div
      className={`container mx-auto ${
        theme === "dark" ? "bg-black" : "bg-slate-200"
      } flex justify-between items-center h-16`}
    >
      <div className="flex items-center">
        <div className="text-lg font-bold px-2">
          <h3>Library Manager</h3>
        </div>
        <div className="flex ml-5 gap-3">
          <Link
            to="/"
            className={`hover:border-b hover:border-green-300 ${
              theme === "dark" ? "bg-black" : "hover:bg-slate-300"
            }`}
          >
            <p className="mx-5 py-4">Books</p>
          </Link>
          <Link
            to="/authors"
            className={`hover:border-b hover:border-green-300 ${
              theme === "dark" ? "bg-black" : "hover:bg-slate-300"
            }`}
          >
            <p className="mx-5 py-4">Authors</p>
          </Link>
          <Link
            to="/categories"
            className={`hover:border-b hover:border-green-300 ${
              theme === "dark" ? "bg-black" : "hover:bg-slate-300"
            }`}
          >
            <p className="mx-5 py-4">Categories</p>
          </Link>
          <Link
            to="/newpage"
            className={`hover:border-b hover:border-green-300 ${
              theme === "dark" ? "bg-black" : "hover:bg-slate-300"
            }`}
          >
            <p className="mx-5 py-4">New Page</p>
          </Link>
        </div>
      </div>
      <div className="relative w-20 -translate-y-2/4 -translate-x-2/4">
        <input
          className={`opacity-0 absolute z-10 left-2/4 -translate-x-2/4 -translate-y-2/4 h-9 w-9 cursor-pointer rounded-full bg-gray-400`}
          onClick={handleThemeChange}
          type="checkbox"
        />
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 h-10 w-10">
          {theme === "dark" ? (
            <FaCloudMoon className="h-full w-full" />
          ) : (
            <BsSun className="h-full w-full" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
