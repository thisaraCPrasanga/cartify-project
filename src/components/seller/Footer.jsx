import React from "react";
import { assets } from "@/assets/assets";
import "./Footer.css";


const Footer = () => {
  return (
    <div className="seller-footer-container">
      <div className="seller-footer-left">
        <img className="seller-footer-logo" width={150} height={150} src={assets.logo} alt="logo" />
        <div className="seller-footer-divider"></div>
        <p className="seller-footer-copyright">
          Copyright 2025 © greatstack.dev All Right Reserved.
        </p>
      </div>
      <div className="seller-footer-social">
        <a href="#">
          <img src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;