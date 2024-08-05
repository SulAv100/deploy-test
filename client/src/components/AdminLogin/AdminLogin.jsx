import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./AdminLogin.css";
import { useAuth } from "../../hook/Context";

function AdminLogin() {
  const navigate = useNavigate();
  const { checkAdminStatus, username, adminStatus } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitAdmin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/adminLogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        checkAdminStatus();
        console.log(data);
        navigate("/adminLanding");
      } else {
        toast.error(data.err,{
          autoClose:2000
        })
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (username) {
      navigate("/");
    }
  });

  useEffect(()=>{
    if(adminStatus){
      navigate('/adminLanding');
    }else{
      console.log("");
    }
  })

  return (
    <div className="main-container">
      <div className="login-form">
        <h1>Admin Login</h1>
        <form onSubmit={submitAdmin}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
          />
          <button type="submit">Login</button>
        </form>
       
      </div>
      <ToastContainer/>
    </div>
  );
}

export default AdminLogin;