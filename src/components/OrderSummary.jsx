
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "./OrderSummary.css";

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/user/get-address', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (data.success) {
        setUserAddresses(data.addresses)
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0])
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select an address")
        return
      }

      let cartItemsArray = Object.keys(cartItems).map((key) => {
        return {
          product: key,
          quantity: cartItems[key]
        }
      })
      cartItemsArray = cartItemsArray.filter((item) => item.quantity > 0)

      if (cartItemsArray.length == 0) {
        return toast.error("Please add items to cart")
      }

      const token = await getToken()

      const { data } = await axios.post('/api/order/create', {
        address: selectedAddress._id,
        items: cartItemsArray
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (data.success) {
        toast.success(data.message)
        setCartItems({})

        router.push('/order-placed')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (user) {
      fetchUserAddresses()
    }
  }, [user])

  return (
    <div className="order-summary-container">
      <h2 className="order-summary-title">
        Order Summary
      </h2>
      <hr className="order-summary-divider" />
      <div className="order-summary-content">
        <div>
          <label className="order-summary-label">
            Select Address
          </label>
          <div className="order-summary-dropdown-container">
            <button
              className="order-summary-dropdown-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullname}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`order-summary-dropdown-icon ${isDropdownOpen ? "order-summary-dropdown-icon-open" : "order-summary-dropdown-icon-closed"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="order-summary-dropdown-menu">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="order-summary-dropdown-item"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullname}, {address.address}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="order-summary-dropdown-add"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="order-summary-label">
            Promo Code
          </label>
          <div className="order-summary-promo-container">
            <input
              type="text"
              placeholder="Enter promo code"
              className="order-summary-promo-input"
            />
            <button className="order-summary-promo-btn">
              Apply
            </button>
          </div>
        </div>

        <hr className="order-summary-divider" />

        <div className="order-summary-totals">
          <div className="order-summary-row-main">
            <p className="order-summary-row-label">Items {getCartCount()}</p>
            <p className="order-summary-row-value">{currency} {getCartAmount()}</p>
          </div>
          <div className="order-summary-row">
            <p className="order-summary-row-fee-label">Shipping Fee</p>
            <p className="order-summary-row-fee-value">Free</p>
          </div>
          <div className="order-summary-row">
            <p className="order-summary-row-fee-label">Tax (2%)</p>
            <p className="order-summary-row-fee-value">{currency} {Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="order-summary-total-row">
            <p>Total</p>
            <p>{currency} {getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
          </div>
        </div>
      </div>

      <button onClick={createOrder} className="order-summary-place-btn">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;