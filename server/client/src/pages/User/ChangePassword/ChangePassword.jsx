import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ChangePassword.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    {
      if (newPassword === reenterPassword) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/auth/updatePassword`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ newPassword: newPassword, token: token }),
            }
          );
          const data = await response.json();

          if (response.ok) {
            navigate("/login");
          } else {
            console.log(data.msg);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        toast.error("Password didnt match");
      }
    }
  };

  return (
    <>
      <div className="update-password-container">
        <div className="update-password-form">
          <h1>Change Password</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <label htmlFor="reenter-password">Re-enter Password:</label>
            <input
              type="password"
              id="reenter-password"
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
            />
            <button type="submit">Update Password</button>
          </form>
          <div className="links">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ChangePassword;
