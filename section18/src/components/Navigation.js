import { createContext, useState, useEffect } from "react";

const NavigationContext = createContext();

function NavigationProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const pageChangeButtonsHandler = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", pageChangeButtonsHandler);

    return window.removeEventListener("popstate", pageChangeButtonsHandler);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <NavigationContext.Provider value={{ navigateTo, currentPath }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
export { NavigationProvider };
