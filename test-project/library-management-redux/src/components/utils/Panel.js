import classNames from "classnames";

function Panel({ children, className }) {
  const panel = classNames("border", "rounded", "w-full", className);

  return <div className={panel}> {children} </div>;
}

export default Panel;
