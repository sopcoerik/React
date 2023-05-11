import "../css/ImageShow.css";

function ImageShow({ link }) {
  return (
    <div className="image--container">
      <img src={link} alt="" />;
    </div>
  );
}

export default ImageShow;
