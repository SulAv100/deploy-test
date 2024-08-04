import React, { useEffect } from "react";
import "./Hero.css";
import bodyImage from "../../../assets/body-image.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hook/Context";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const { getUserData, adminStatus, checkAdminStatus } = useAuth();
  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    localStorage.removeItem("correctValue");
    localStorage.removeItem("incorrectValue");
    localStorage.removeItem("incorrectImages");
  });

  useEffect(() => {
    if (adminStatus) {
      navigate("/adminLogin");
    } else {
    }
    // dependice on the function to get status
  }, [checkAdminStatus]);

  return (
    <section className="main-content">
      <div className="main-container">
        <div className="left-container">
          <h1>Test Your Color Vision</h1>
          <article>
            Discover the power of your eyes. Take a test to understand your
            color vision.
          </article>
          <Link to="/redirect">
            <span>
              <p>Take Test</p>
              <i className="fa-solid fa-angles-right"></i>
            </span>
          </Link>
        </div>
        <div className="right-container">
          <figure>
            <img src={bodyImage} alt="Eye Test" />
          </figure>
        </div>
      </div>
      <div className="eye-info">
        <div className="single-info">
          <i className="fa-solid fa-users"></i>
          <h2>How common is it?</h2>
          <p>1 in 12 males are color blind.</p>
        </div>
        <div className="single-info">
          <i className="fa-solid fa-eye"></i>
          <h2>Types of Color Blindness</h2>
          <p>
            There are several types, including red-green, blue-yellow, and total
            color blindness.
          </p>
        </div>
        <div className="single-info">
          <i className="fa-solid fa-brain"></i>
          <h2>How it Works</h2>
          <p>
            Color blindness occurs when there is a problem with the pigments in
            certain nerve cells of the eye.
          </p>
        </div>
        <div className="single-info">
          <i className="fa-solid fa-glasses"></i>
          <h2>Living with Color Blindness</h2>
          <p>
            Most people with color blindness can adapt and lead normal lives.
          </p>
        </div>
        <div className="single-info">
          <i className="fa-solid fa-palette"></i>
          <h2>Testing Methods</h2>
          <p>
            Various methods like Ishihara plates and Farnsworth-Munsell 100 hue
            test are used for diagnosis.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;