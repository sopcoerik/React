import Panel from "../../components/books/Panel";

function Header({ navigate }) {
  const handleNavigationToBooks = () => {
    navigate("/");
  };
  const handleNavigationToAuthors = () => {
    navigate("/authors");
  };

  return (
    <Panel className="flex justify-between items-center p-3">
      <div>
        <h3>Library</h3>
      </div>
      <div className="flex">
        <div className="mr-2" onClick={handleNavigationToBooks}>
          Books
        </div>
        <div className="mr-2" onClick={handleNavigationToAuthors}>
          Authors
        </div>
      </div>
    </Panel>
  );
}

export default Header;
