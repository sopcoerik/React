import { useSelector } from "react-redux";
import { useTheme } from "../../hooks/useTheme";

function UserPage() {
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const theme = useTheme();

  if (!activeUser) {
    return (
      <div className="container mx-auto text-center py-10 text-xl font-bold">
        Please Log In
      </div>
    );
  }

  return (
    <div className={"container mx-auto"}>
      {activeUser && (
        <div
          className={`w-full p-3 ${theme === "dark" ? theme : "bg-slate-50"}`}
        >
          <div className="text-center">
            <h1 className="font-bold text-2xl py-3">Your Profile</h1>
          </div>
          <div>
            <div className="mx-2 my-3 border-b">
              <h3 className="font-bold text-lg">
                Name:<p className="font-normal">{activeUser.name}</p>
              </h3>
            </div>
            <div className="mx-2 my-3 border-b">
              <h3 className="font-bold text-lg">
                Email:<p className="font-normal">{activeUser.email}</p>
              </h3>
            </div>
            <div className="mx-2 my-3 border-b">
              <h3 className="font-bold text-lg">
                Password:<p className="font-normal">{activeUser.password}</p>
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
