import { Link } from "react-router-dom";
import { FaCloudMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { setTheme, useGetAllBooksQuery } from "../../store";
import { useTheme } from "../../hooks/useTheme";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeActiveUser } from "../../store/slices/activeUserSlice";

import {
  useFetchFavoritesQuery,
  useFetchAuthorsQuery,
  useFetchBooksQuery,
} from "../../store";

import { CgProfile } from "react-icons/cg";

import Favorites from "../../components/utils/Favorites";

function Header() {
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  const handleLogOut = () => {
    dispatch(removeActiveUser());
  };

  const theme = useTheme();
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const { data: favorites, isLoading: favoritesLoading } =
    useFetchFavoritesQuery(activeUser && { userId: activeUser?.id });

  const { data: authors } = useFetchAuthorsQuery();
  const { data: books } = useGetAllBooksQuery();

  return (
    <div
      className={`container mx-auto ${
        theme === "dark" ? "bg-black text-white" : "bg-slate-200"
      } flex justify-around items-center h-16`}
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
      <div className="relative w-20 -translate-y-2/4 translate-x-2/4">
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

      <div>
        <Link to="/user">
          <CgProfile className="text-3xl" />
        </Link>
      </div>

      <div>
        {activeUser && (
          <Favorites favorites={favorites} authors={authors} books={books} />
        )}
      </div>

      <div
        className={`flex flex-col justify-around items-center h-16 ${
          theme === "dark"
            ? "bg-zinc-800 text-white"
            : " bg-slate-400 text-slate-200"
        }`}
      >
        <div
          className={`${
            !activeUser
              ? "hover:bg-slate-700 cursor-pointer"
              : "bg-slate-200 text-black"
          } py-1 px-3 w-24 text-center`}
        >
          {activeUser ? (
            <p>Hi, {activeUser.name}</p>
          ) : (
            <Link to="/signup">Sign Up</Link>
          )}
        </div>
        <div
          className={`${
            !activeUser
              ? "hover:bg-slate-700"
              : "hover:bg-slate-500 hover:text-white"
          }  py-1 px-3 cursor-pointer w-24 text-center`}
        >
          {activeUser ? (
            <Link to="/login" onClick={handleLogOut}>
              Log Out
            </Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
