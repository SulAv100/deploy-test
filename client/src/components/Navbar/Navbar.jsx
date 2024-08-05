import React, { useEffect } from "react";
import "./Navbar.css";
import logoImage from "../../assets/logovision.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { useAuth } from "../../hook/Context";

function Navbar() {
  const { getUserData, username, setUsername, adminStatus, checkAdminStatus } =
    useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const userLogout = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setUsername("");
        toast.success("User logged out successfully!");
        navigate("/");
        window.location.reload();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const adminLogout = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/adminLogout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.ok) {
        setUsername("");
        toast.success("Admin logged out successfully!");

        navigate("/adminLogin");
        window.location.reload();
      } else {
        console.log(data);
        toast.error("An error occurred during logout.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <>
      <header>
        <div className="left-component">
          {adminStatus ? (
            <Link to="/adminLanding">
              <figure>
                <img src={logoImage} alt="Vision Logo" />
              </figure>
            </Link>
          ) : (
            <Link to="/">
              <figure>
                <img src={logoImage} alt="Vision Logo" />
              </figure>
            </Link>
          )}
        </div>
        {!adminStatus ? (
          <>
            <nav className="nav-components">
              <ul>
                {adminStatus ? (
                  <Link to="/adminLanding">
                    <li>Home</li>
                  </Link>
                ) : (
                  <Link to="/">
                    <li>Home</li>
                  </Link>
                )}

                {username ? (
                  <Link to="/history">
                    {" "}
                    <li>{username}</li>
                  </Link>
                ) : (
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                )}
                {username && <li onClick={userLogout}>Logout</li>}
              </ul>
            </nav>
          </>
        ) : (
          <>
            {adminStatus ? (
              <nav className="nav-components">
                <ul>
                  <li onClick={adminLogout}>Admin Logout</li>
                </ul>
              </nav>
            ) : (
              <></>
            )}
          </>
        )}
      </header>
      <ToastContainer />
    </>
  );
}

export default Navbar;