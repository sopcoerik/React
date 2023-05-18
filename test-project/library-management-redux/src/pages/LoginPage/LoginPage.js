import { useState } from "react";
import { useFetchUsersQuery } from "../../store";
import { useNavigate } from "react-router-dom";
import { addActiveUser } from "../../store";
import { useDispatch } from "react-redux";

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading } = useFetchUsersQuery();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userMatch = data.find(
      (user) => user.password === password && user.email === email
    );
    console.log(userMatch);
    if (userMatch) {
      setEmail("");
      setPassword("");
      navigate("/");
      dispatch(addActiveUser(userMatch));
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="relative container mx-auto h-4/6 mt-20 bg-white flex justify-center items-center flex-col rounded-2xl border border-gray-400">
          <h3 className="absolute top-24 left-2/4 -translate-x-2/4 -translate-y-2/4 text-3xl font-bold">
            Log In
          </h3>
          <div className="w-4/6 h-0.5 bg-gray-200 mb-24" />
          <div className="w-96 flex justify-center items-center">
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col mb-8">
                <label>E-mail:</label>
                <input
                  type="email"
                  placeholder="Enter Your E-mail"
                  className="border border-gray-200 py-1 px-3"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flex flex-col">
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="border border-gray-200 py-1 px-3"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex justify-center my-16">
                <button className="border rounded transition-all hover:bg-green-400 hover:text-white py-1 px-3 text-lg">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LogInPage;
