import React from "react";
import { assets } from "@/assets/assets";
import "./Footer.css";


const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <img className="footer-logo" src={assets.logo} alt="logo" />
          <p className="footer-description">
            Shop with Confidence Cartify is dedicated to providing a safe and transparent
            shopping experience. With encrypted payments, easy returns, and verified
            quality checks on every item, we make sure your peace of mind is never a
            luxury. Welcome to the future of retail.
          </p>
        </div>

        <div className="footer-section">
          <div>
            <h2 className="footer-heading">Company</h2>
            <ul className="footer-list">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-section-contact">
          <div>
            <h2 className="footer-heading">Get in touch</h2>
            <div className="footer-contact-info">
              <p>+94 112 453 000</p>
              <p>contact@cartify.dev</p>
            </div>
          </div>
        </div>
      </div>
      <p className="footer-copyright">
        Copyright 2026 © Cartify.dev All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;