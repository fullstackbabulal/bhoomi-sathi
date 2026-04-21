const Gallery = () => {
  return (
    <div className="container mt-5">
      <h3>Gallery</h3>

      <div className="row">
        {[1, 2, 3].map((i) => (
          <div className="col-md-4" key={i}>
            <div className="bg-secondary text-white text-center p-5">
              Image {i}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
