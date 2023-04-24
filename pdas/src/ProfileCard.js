export function ProfileCard({ title, tag, image, description }) {
  return (
    <div>
      <div className="card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img src={image} />
          </figure>
        </div>
      </div>

      <div className="card-content">
        <div className="media-content">
          <p className="title is-4">{title}</p>
          <p className="title is-6">{tag}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
