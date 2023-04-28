import Link from "./Link";

function Sidebar() {
  return (
    <div className="nav">
      <Link path={"/"}>Dropdown</Link>
      <Link path={"/accordeon"}>Accordeon</Link>
      <Link path={"/buttons"}>Buttons</Link>
    </div>
  );
}

export default Sidebar;
