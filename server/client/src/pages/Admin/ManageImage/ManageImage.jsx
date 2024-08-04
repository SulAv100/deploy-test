import React, { useEffect, useState } from "react";
import "./ManageImage.css";
import { useAuth } from "../../../hook/Context";

function ManageImage() {
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/imgs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include'
        });

        const data = await response.json();

        if (response.ok) {
          setAllImages(data.imgs);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchImageData();
  }, []);

  const handleDelete = async (imageId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/imgs/delete/${imageId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include'
        }
      );
      const data = await response.json();

      if (response.ok) {
        window.location.reload();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="gallery-container">
      <h1>Image Gallery</h1>
      <div className="image-grid">
        {allImages.map((image, index) => (
          <div key={index} className="image-card">
            <figure>
              <img
                src={`../../../../public/uploads/${image.name}`}
                alt={image.description}
              />
            </figure>
            <button onClick={() => handleDelete(image._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageImage;
