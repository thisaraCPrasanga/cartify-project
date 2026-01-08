
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useParams, useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

import "./Product.css";

const Product = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { products, router, addToCart } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    return productData ? (<>
        <Navbar />
        <div className="product-page-container">
            <div className="product-details-grid">
                <div className="product-images-section">
                    <div className="product-main-image-container">
                        <img
                            src={mainImage || productData.image[0]}
                            alt="alt"
                            className="product-main-image"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="product-thumbnails-grid">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className="product-thumbnail-container"
                            >
                                <img
                                    src={image}
                                    alt="alt"
                                    className="product-thumbnail-image"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="product-info-section">
                    <h1 className="product-title">
                        {productData.name}
                    </h1>
                    <div className="product-rating">
                        <div className="product-stars">
                            <img className="product-star-icon" src={assets.star_icon} alt="star_icon" />
                            <img className="product-star-icon" src={assets.star_icon} alt="star_icon" />
                            <img className="product-star-icon" src={assets.star_icon} alt="star_icon" />
                            <img className="product-star-icon" src={assets.star_icon} alt="star_icon" />
                            <img
                                className="product-star-icon"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>
                    <p className="product-description">
                        {productData.description}
                    </p>
                    <p className="product-price-container">
                        LKR {productData.offerPrice}
                        <span className="product-original-price">
                            LKR {productData.price}
                        </span>
                    </p>
                    <hr className="product-divider" />
                    <div className="product-specs-container">
                        <table className="product-specs-table">
                            <tbody>
                                <tr>
                                    <td className="product-spec-label">Brand</td>
                                    <td className="product-spec-value ">Generic</td>
                                </tr>
                                <tr>
                                    <td className="product-spec-label">Color</td>
                                    <td className="product-spec-value ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="product-spec-label">Category</td>
                                    <td className="product-spec-value">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="product-actions">
                        <button onClick={() => addToCart(productData._id)} className="product-add-cart-btn">
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(productData._id); navigate('/cart') }} className="product-buy-now-btn">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="product-featured-section">
                <div className="product-featured-header">
                    <p className="product-featured-title">Featured <span className="product-featured-title-span">Products</span></p>
                    <div className="product-featured-underline"></div>
                </div>
                <div className="product-featured-grid">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button onClick={() => router.push('/all-products')} className="product-see-more-btn">
                    See more
                </button>
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />
};

export default Product;