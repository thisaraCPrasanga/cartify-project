import React from 'react'
import { assets } from '@/assets/assets'
import './ProductCard.css';

import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="product-card"
        >
            <div className="product-card-image-container">
                <img
                    src={product.image[0]}
                    alt={product.name}
                    className="product-card-image"
                    width={800}
                    height={800}
                />
                <button className="product-card-favorite-button">
                    <img
                        className="product-card-favorite-icon"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="product-card-name">{product.name}</p>
            <p className="product-card-description">{product.description}</p>
            <div className="product-card-rating">
                <p className="product-card-rating-value">{4.5}</p>
                <div className="product-card-stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <img
                            key={index}
                            className="product-card-star"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="product-card-footer">
                <p className="product-card-price">{currency}{product.offerPrice}</p>
                <button className="product-card-buy-button">
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard