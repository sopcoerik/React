import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../store";
import { useNavigate } from "react-router-dom";
import { removeActiveUser } from "../../store/slices/activeUserSlice";

function UserPage() {
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const theme = useTheme();

  const [updateUser] = useUpdateUserMutation();

  const [user, setUser] = useState(activeUser);
  const [repeatedPassword, setRepeatedPassword] = useState(
    activeUser?.password
  );
  const [valid, setValid] = useState(false);

  const validatePassword = (e) => {
    if (e.target.type === "password") {
      return;
    } else {
      repeatedPassword === user.password ? setValid(true) : setValid(false);
    }
  };

  useEffect(() => {
    const cleaner = () => {
      document.removeEventListener("click", validatePassword);
    };

    document.addEventListener("click", validatePassword);

    return () => {
      cleaner();
    };
  });

  if (!activeUser) {
    return (
      <div className="container mx-auto text-center py-10 text-xl font-bold">
        Please Log In
      </div>
    );
  }

  const handleFormInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatedPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateUser({
      id: activeUser.id,
      updatedUser: { ...user },
    });

    navigate("/login");
    dispatch(removeActiveUser());
  };

  return (
    <div className={"container mx-auto"}>
      {activeUser && (
        <div
          className={`w-full p-3 ${theme === "dark" ? theme : "bg-slate-50"}`}
        >
          <div className="text-center border-b">
            <h1 className="font-bold text-2xl py-3">Your Profile</h1>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col">
                <label className="text-lg font-bold">Name:</label>
                <input
                  name="name"
                  type="text"
                  className={`${
                    theme === "dark" ? theme : "bg-inherit text-black"
                  } outline-none`}
                  value={user.name}
                  onChange={handleFormInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-bold">Email:</label>
                <input
                  name="email"
                  type="email"
                  className={`${
                    theme === "dark" ? theme : "bg-inherit text-black"
                  } outline-none`}
                  value={user.email}
                  onChange={handleFormInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-bold">Password:</label>
                <input
                  name="password"
                  type="password"
                  className={`${
                    theme === "dark" ? theme : "bg-inherit text-black"
                  } outline-none`}
                  value={user.password}
                  onChange={handleFormInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-bold">Repeat Password:</label>
                <input
                  name="password"
                  type="password"
                  className={`${
                    theme === "dark" ? theme : "bg-inherit text-black"
                  } outline-none`}
                  value={repeatedPassword}
                  onChange={handleRepeatPasswordChange}
                />
                <div>
                  <label>Password Match:</label>
                  <div
                    className={`w-8 h-3 ${
                      user.password === repeatedPassword
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                  />
                </div>
              </div>

              <button
                className={`border ${
                  (user === activeUser || !valid) && "bg-gray-200"
                } rounded px-3 py-1 mt-3`}
                disabled={user === activeUser || !valid}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
