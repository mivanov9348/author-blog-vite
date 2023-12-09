import ImageDetail from "./ImageDetail";
import "./Gallery.css";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/images");
        const data = await response.json();
        setImages(data.map((filename) => `../public/Images/${filename}`));
        console.log(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <ImageDetail src={image} key={index} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
}
