"use client"
import React from "react";
import { assets, BagIcon, BoxIcon, HomeIcon } from "@/assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

import { useClerk, UserButton } from "@clerk/clerk-react";

const CartIcon = () => (
  <img src={assets.cart_icon} alt="cart icon" width={16} height={16} />
);

const Navbar = () => {

  const { isSeller, router, user, search, setSearch, getCartCount } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="navbar">
      <img
        className="navbar-logo"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/all-products" className="navbar-link">
          Shop
        </Link>
        <a href="#footer" className="navbar-link">
          About Us
        </a>
        <a href="#footer" className="navbar-link">
          Contact
        </a>

        {isSeller && <button onClick={() => router.push('/seller')} className="navbar-seller-button">Seller Dashboard</button>}

      </div>

      <ul className="navbar-actions">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search..."
            className="navbar-search-input"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') router.push('/all-products')
            }}
            value={search}
          />
          <button onClick={() => router.push('/all-products')}>
            <img className="navbar-search-icon" src={assets.search_icon} alt="search icon" />
          </button>
        </div>
        <Link to="/cart" className="navbar-cart-link">
          <img src={assets.cart_icon} alt="cart" className="navbar-cart-icon" />
          <span className="navbar-cart-badge">{getCartCount()}</span>
        </Link>
        {
          user ? <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
              </UserButton.MenuItems>

              <UserButton.MenuItems>
                <UserButton.Action label="my orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>

              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
              </UserButton.MenuItems>

              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
              </UserButton.MenuItems>

            </UserButton>
          </> :
            <button onClick={openSignIn} className="navbar-account-button">
              <img src={assets.user_icon} alt="user icon" />
              Account
            </button>
        }
      </ul>

      <div className="navbar-mobile">
        {isSeller && <button onClick={() => router.push('/seller')} className="navbar-seller-button">Seller Dashboard</button>}
        {
          user ? <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
              </UserButton.MenuItems>

              <UserButton.MenuItems>
                <UserButton.Action label="my orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>

              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
              </UserButton.MenuItems>

              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
              </UserButton.MenuItems>

            </UserButton>
          </> :
            <button onClick={openSignIn} className="navbar-account-button">
              <img src={assets.user_icon} alt="user icon" />
              Account
            </button>
        }
      </div>
    </nav>
  );
};

export default Navbar;