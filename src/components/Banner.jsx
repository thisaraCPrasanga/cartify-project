import React from "react";
import { assets } from "@/assets/assets";
import "./Banner.css";


const Banner = () => {
  return (
    <div className="banner-container">
      <img
        className="banner-image-left"
        src={assets.jbl_soundbox_image}
        alt="jbl_soundbox_image"
      />
      <div className="banner-content">
        <h2 className="banner-heading">
          Level Up Your Gaming Experience
        </h2>
        <p className="banner-text">
          From immersive sound to precise controls—everything you need to win
        </p>
        <button className="banner-button">
          Buy now
          <img className="banner-button-icon" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </button>
      </div>
      <img
        className="banner-image-right"
        src={assets.md_controller_image}
        alt="md_controller_image"
      />
      <img
        className="banner-image-right-mobile"
        src={assets.sm_controller_image}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;