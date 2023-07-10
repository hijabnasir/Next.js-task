import React, { useEffect, useState } from 'react';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPhotos();
  }, []);

  if (!photos.length) {
    return <p>Loading photos...</p>;
  }

  return (
    <div className="photo-gallery">
      {photos.map((photo) => (
        <img key={photo.id} src={photo.url} alt={photo.title} />
      ))}
    </div>
  );
};

export default PhotoGallery;
