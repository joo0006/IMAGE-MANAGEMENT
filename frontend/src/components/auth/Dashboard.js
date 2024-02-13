// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getAllImages, labelImage } from '../services/imageService';

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getAllImages(page, 10); // Adjust page size as needed
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [page]);

  const handleLabelImage = async (imageId, labelIds) => {
    try {
      await labelImage(imageId, labelIds);
      // Optionally update state or refetch images after labeling
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = () => {
    // Implement scroll handling logic if needed
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Implement image rendering logic */}
      {images.map((image) => (
        <div key={image._id}>
          <img src={`path/to/your/images/${image.filename}`} alt={image.filename} />
          <div>
            {image.labels.map((label) => (
              <span key={label._id}>{label.name}</span>
            ))}
          </div>
          {/* Implement label selection UI */}
          <button onClick={() => handleLabelImage(image._id, ['labelId1', 'labelId2'])}>
            Label Image
          </button>
        </div>
      ))}
      {/* Implement pagination UI */}
      <button onClick={() => setPage((prevPage) => prevPage + 1)}>Load More</button>
    </div>
  );
};

export default Dashboard;

