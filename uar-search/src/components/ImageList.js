import ImageShow from "./ImageShow";
import "../css/ImageList.css";

function ImageList({ images }) {
  const renderedImages = images?.map((image) => (
    <ImageShow link={image.urls.small} key={image.id} />
  ));

  return <div className="images--container"> {renderedImages} </div>;
}

export default ImageList;
