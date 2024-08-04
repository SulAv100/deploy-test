import React, { useRef, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminUpload.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/Context";

function AdminUpload() {
  const {adminStatus, checkAdminStatus} = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [images, setImages] = useState(null);
  const [fetchImage, setFetchImage] = useState(null);
  const [imageNumber, setImageNumber] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;

    if (!files.length) return;
    const file = files[0];
    setFetchImage(file);
    const filePreviews = URL.createObjectURL(file);
    setImages(filePreviews);
  };

  const sendImageData = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", imageNumber);
    formData.append("imageFile", fetchImage);

    try {
      const response = await fetch(`http://localhost:3000/api/admin/imgs`, {
        method: "POST",
        body: formData,
        credentials:'include'
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Image uploaded successfully!");
        setImages(null);
        setFetchImage(null);
        setImageNumber(null);
      } else {
        toast.error("Failed to upload image.");
        console.log(data.msg);
      }
    } catch (error) {
      toast.error("An error occurred during the upload.");
      console.error(error);
    }
  };
 


 

  return (
    <form onSubmit={sendImageData} encType="multipart/form-data">
      <div className="main-upload-container">
        <div className="upload-container">
          <div className="upper-container">
            {images ? (
              <>
                <figure>
                  <img src={images} alt="" />
                </figure>
                <div className="number-info">
                  <label htmlFor="Enter">Enter num :</label>
                  <input
                    value={imageNumber}
                    onChange={(event) => setImageNumber(event.target.value)}
                    type="text"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <i className="fa-solid fa-upload fa-bounce"></i>
                <p className="upload">Upload Image</p>
                <p className="info">Image must be less than 2MB</p>
              </>
            )}
          </div>
          <div className="lower-container">
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileUpload}
              name="imageFile"
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <button type="button" onClick={handleButtonClick}>
              Select Image
            </button>
          </div>
        </div>

        {images && (
          <button type="submit" className="submit-upload">
            Submit data
          </button>
        )}
      </div>
      <ToastContainer />
    </form>
  );
}

export default AdminUpload;