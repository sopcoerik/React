import SearchBar from "./components/SearchBar";
import { useState } from "react";
import getQueryFromAPI from "./components/fetcher";
import ImageList from "./components/ImageList";
import "./css/App.css";

function App() {
  const [images, setImages] = useState([]);

  const handleSubmit = async (query) => {
    const imagesData = await getQueryFromAPI(query);
    setImages(imagesData);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={images} />
    </div>
  );
}

export default App;
