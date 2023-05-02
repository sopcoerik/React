import Link from "./Link";

function Sidebar() {
  const links = [
    { name: "Dropdown", path: "/" },
    { name: "Accordeon", path: "/accordeon" },
    { name: "Buttons", path: "/buttons" },
    { name: "Modal", path: "/modal" },
    { name: "Table", path: "/table" },
  ];

  const renderedLinks = links.map((link) => {
    return <Link path={link.path}>{link.name}</Link>;
  });

  return <div className="nav">{renderedLinks}</div>;
}

export default Sidebar;
