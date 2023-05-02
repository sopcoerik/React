import NavigationContext from "./Navigation";
import { useContext } from "react";

function Route({ path, children }) {
  const { currentPath } = useContext(NavigationContext);

  if (path === currentPath) return children;
  else return null;
}

export default Route;
