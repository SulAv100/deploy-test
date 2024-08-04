import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>CWEF</h2>
        </div>
        <div className="footer-info">
          <p>© 2024 Vision. All rights reserved.</p>
          <p>
            Designed by{" "}
            <a target="_blank" href="https://ecommercesathi.com/">Ecommerce Sathi</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
