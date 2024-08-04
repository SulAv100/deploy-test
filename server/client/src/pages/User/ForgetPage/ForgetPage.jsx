import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./ForgetPage.css";

function ForgetPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.loading("Check your email");

    try {
      const response = await fetch(
      `http://localhost:3000/api/auth/forgetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        navigate('/static-page')
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Submit</button>
        </form>
        <div className="links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgetPage;
