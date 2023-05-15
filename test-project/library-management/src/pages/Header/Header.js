import { Link } from "react-router-dom";
import { useThemeContext } from "../../hooks/useThemeContext";

function Header() {
  const { theme } = useThemeContext();

  return (
    <div
      className={`container mx-auto ${
        theme === "dark" ? "bg-black" : "bg-slate-200"
      } flex items-center h-16`}
    >
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
      </div>
    </div>
  );
}

export default Header;
