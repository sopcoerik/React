import NavigationContext from "./Navigation";
import { useContext } from "react";

function Link({ children, path }) {
  const { navigateTo, currentPath } = useContext(NavigationContext);

  const handleClick = (e) => {
    e.preventDefault();

    navigateTo(path);
  };

  return (
    <a
      href={path}
      onClick={handleClick}
      className={path === currentPath ? "link active-link" : "link"}
    >
      {children}
    </a>
  );
}

export default Link;
