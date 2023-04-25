import SearchBar from "./components/SearchBar";
import { useState } from "react";
import getQueryFromAPI from "./components/fetcher";
import ImageList from "./components/ImageList";
import "./css/App.css";

function App() {
  const [searchedItems, setSearchedItems] = useState([]);

  const [imagesToSend, setImagesToSend] = useState([]);

  const handleSubmit = (items) => {
    setSearchedItems(items);
    sendImagesToImageList();
  };

  const sendImagesToImageList = async () => {
    setImagesToSend(await getQueryFromAPI(searchedItems));
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={imagesToSend} />
    </div>
  );
}

export default App;
