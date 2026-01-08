import React from "react";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import "./FeaturedProduct.css";


const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  const { products: allProducts, router } = useAppContext();

  // Dynamically find the ID for the specifically requested product
  const getProductId = (title) => {
    if (title === "Unparalleled Sound") {
      // Look for a product related to JBL headphones
      const targetProduct = allProducts.find(p => {
        const name = p.name.toLowerCase();
        return name.includes("jbl") && (name.includes("headphone") || name.includes("670nc"));
      });
      return targetProduct ? targetProduct._id : null;
    } else if (title === "Stay Connected") {
      // Look for a product related to Apple earphones
      const targetProduct = allProducts.find(p => {
        const name = p.name.toLowerCase();
        return name.includes("apple") && (name.includes("earphone") || name.includes("airpod") || name.includes("wired") || name.includes("ear"));
      });
      return targetProduct ? targetProduct._id : null;
    } else if (title === "Power in Every Pixel") {
      // Look for a product related to Asus ROG laptops
      const targetProduct = allProducts.find(p => {
        const name = p.name.toLowerCase();
        return name.includes("asus") && (name.includes("rog") || name.includes("laptop"));
      });
      return targetProduct ? targetProduct._id : null;
    }
    return null;
  }

  return (
    <div className="featured-product-container">
      <div className="featured-product-header">
        <p className="featured-product-title">Featured Products</p>
        <div className="featured-product-divider"></div>
      </div>

      <div className="featured-product-grid">
        {products.map(({ id, image, title, description }) => {
          const productId = getProductId(title);
          return (
            <div
              key={id}
              className="featured-product-card"
              onClick={() => router.push(productId ? `/product/${productId}` : '/all-products')}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={image}
                alt={title}
                className="featured-product-image"
              />
              <div className="featured-product-overlay">
                <p className="featured-product-overlay-title">{title}</p>
                <p className="featured-product-overlay-description">
                  {description}
                </p>
                <button onClick={(e) => { e.stopPropagation(); router.push(productId ? `/product/${productId}` : '/all-products'); }} className="featured-product-button">
                  Buy now <img className="featured-product-button-icon" src={assets.redirect_icon} alt="Redirect Icon" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default FeaturedProduct;
