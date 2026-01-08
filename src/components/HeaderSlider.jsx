import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import "./HeaderSlider.css";


const HeaderSlider = () => {
  const { router } = useAppContext();

  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="header-slider-container">
      <div
        className="header-slider-track"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => router.push('/all-products')}
            className="header-slider-slide"
          >
            <div className="header-slider-content">
              <p className="header-slider-offer">{slide.offer}</p>
              <h1 className="header-slider-title">
                {slide.title}
              </h1>

            </div>
            <div className="header-slider-image-container">
              <img
                className="header-slider-image"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="header-slider-dots">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`header-slider-dot ${currentSlide === index ? "header-slider-dot-active" : "header-slider-dot-inactive"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
