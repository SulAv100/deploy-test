import React, { useEffect, useState } from "react";
import "./Admin.css";
import adminImage from "../../../assets/admin.jpg";
import { useAuth } from "../../../hook/Context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { checkAdminStatus, adminStatus } = useAuth();
  const [countUser, setCountUser] = useState(null);
  const [countImage, setCountImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();

    if (!adminStatus) {
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/admin/users`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials:'include'

            }
          );

          const data = await response.json();
          if (response.ok) {
            setCountUser(data.endUsers.length);
          } else {
            console.log(data.msg);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

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
          setCountImage(data.imageCount);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchImageData();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-image">
        <figure>
          <img src={adminImage} alt="Admin" />
        </figure>
        <span>Welcome Admin</span>
      </div>
      <div className="admin-operations">
        <span onClick={() => (window.location.href = "/upload-image")}>
          Upload Image
        </span>
        <span onClick={() => (window.location.href = "/user-data")}>
          See User Data
        </span>
        <Link to="/signup">
          {" "}
          <span>Add User</span>
        </Link>
        <Link to="/manageImage">
          {" "}
          <span>ManageImage</span>
        </Link>
      </div>
      <div className="admin-stats">
        <div className="stat">
          <h3>Total Users</h3>
          <p>{countUser}</p>
        </div>
        <div className="stat">
          <h3>Images Uploaded</h3>
          <p>{countImage}</p>
        </div>
        <div className="stat">
          <h3>Active Sessions</h3>
          <p>45</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
