import Panel from "../../components/utils/Panel";

function Header() {
  return (
    <Panel className="flex justify-between items-center p-3">
      <div>
        <h3>Library</h3>
      </div>
      <div className="flex">
        <div className="mr-2">Books</div>
        <div className="mr-2">Authors</div>
      </div>
    </Panel>
  );
}

export default Header;
