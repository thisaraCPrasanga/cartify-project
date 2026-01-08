'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";

import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

import "./Cart.css";

const Cart = () => {

  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <div className="cart-content">
          <div className="cart-header">
            <p className="cart-title">
              Your <span className="cart-title-highlight">Cart</span>
            </p>
            <p className="cart-count">{getCartCount()} Items</p>
          </div>
          <div className="cart-table-container">
            <table className="cart-table">
              <thead className="cart-table-head">
                <tr>
                  <th className="cart-table-th">
                    Product Details
                  </th>
                  <th className="cart-table-th">
                    Price
                  </th>
                  <th className="cart-table-th">
                    Quantity
                  </th>
                  <th className="cart-table-th">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find(product => product._id === itemId);

                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <tr key={itemId} className="cart-item-row">
                      <td className="cart-item-details-td">
                        <div>
                          <div className="cart-item-image-container">
                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="cart-item-image"
                              width={1280}
                              height={720}
                            />
                          </div>
                          <button
                            className="cart-remove-btn-mobile"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="cart-item-info-desktop">
                          <p className="cart-item-name">{product.name}</p>
                          <button
                            className="cart-remove-btn-desktop"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="cart-item-price-td">LKR {product.offerPrice}</td>
                      <td className="cart-item-quantity-td">
                        <div className="cart-quantity-controls">
                          <button onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}>
                            <img
                              src={assets.decrease_arrow}
                              alt="decrease_arrow"
                              className="cart-quantity-icon"
                            />
                          </button>
                          <input onChange={e => updateCartQuantity(product._id, Number(e.target.value))} type="number" value={cartItems[itemId]} className="cart-quantity-input"></input>
                          <button onClick={() => addToCart(product._id)}>
                            <img
                              src={assets.increase_arrow}
                              alt="increase_arrow"
                              className="cart-quantity-icon"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="cart-item-subtotal-td">${(product.offerPrice * cartItems[itemId]).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button onClick={() => router.push('/all-products')} className="cart-continue-btn group">
            <img
              className="cart-arrow-icon"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />

            Continue Shopping
          </button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;
