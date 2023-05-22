import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../store";
import { useNavigate } from "react-router-dom";
import { removeActiveUser } from "../../store/slices/activeUserSlice";
import Input from "../../components/utils/Input";

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
      repeatedPassword === user?.password ? setValid(true) : setValid(false);
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
              <Input
                name="name"
                type="text"
                value={user.name}
                onInputChange={handleFormInputChange}
                label="Name:"
              />
              <Input
                name="email"
                type="email"
                value={user.email}
                onInputChange={handleFormInputChange}
                label="Email:"
              />

              <Input
                name="password"
                type="password"
                value={user.password}
                onInputChange={handleFormInputChange}
                label="Password:"
                invalid={!valid}
              />

              <Input
                name="confirmPassword"
                type="password"
                value={repeatedPassword}
                onInputChange={handleRepeatPasswordChange}
                label="Confirm Password:"
                error={!valid && "Passwords must match"}
                invalid={!valid}
              />

              <div>
                {valid && (
                  <button
                    type="submit"
                    className={`border rounded px-3 py-1 mt-3`}
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
