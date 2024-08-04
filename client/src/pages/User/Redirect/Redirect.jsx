import React from "react";
import "./Redirect.css";
import Image from "../../../assets/image.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../hook/Context";

function Redirect() {
  const { username } = useAuth();

  const navigate = useNavigate();

  const handleRedirect = () => {
    if (username) {
      navigate("/mainTest");
    } else {
      toast.error("Please login first",{
        autoClose: 900
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    }
  };

  return (
    <>
      <section className="redirect-section">
        <h1>Color Blind Test</h1>

        <article>
          Discover your color vision accuracy with our Color Blind Test. This
          quick and user-friendly tool offers a series of specially designed
          images to determine various types of color blindness.
        </article>

        <div className="border-line"></div>
        <div className="central-container">
          <div className="internal-container">
            <div className="left-image">
              <figure>
                <img src={Image} alt="" />
              </figure>
            </div>
            <div className="right-info">
              <h2>INSTRUCTIONS</h2>
              <div className="ins">
                <div className="single-line">
                  <i className="fa-solid fa-angle-right fa-fade"></i>
                  <p>Adjust screen brightness to 100%.</p>
                </div>
                <div className="single-line">
                  <i className="fa-solid fa-angle-right fa-fade"></i>
                  <p>Ensure any type of blue light filters are off.</p>
                </div>
                <div className="single-line">
                  <i className="fa-solid fa-angle-right fa-fade"></i>
                  <p>Respond within 10 seconds per plate.</p>
                </div>
                <div className="single-line">
                  <i className="fa-solid fa-angle-right fa-fade"></i>
                  <p>Avoid tinted lenses for baseline results.</p>
                </div>
              </div>
              <button onClick={handleRedirect}>START</button>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default Redirect;
