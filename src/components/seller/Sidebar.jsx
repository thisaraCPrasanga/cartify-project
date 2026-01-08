import React from 'react';
import { Link } from "react-router-dom";
import { assets } from '../../assets/assets';

import { useLocation } from 'react-router-dom';
import "./Sidebar.css";

const SideBar = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

    return (
        <div className='seller-sidebar-container'>
            {menuItems.map((item) => {

                const isActive = pathname === item.path;

                return (
                    <Link to={item.path} key={item.name} passHref>
                        <div
                            className={`seller-sidebar-item ${isActive ? "active" : ""}`}
                        >
                            <img
                                src={item.icon}
                                alt={`${item.name.toLowerCase()}_icon`}
                                className="seller-sidebar-icon"
                            />
                            <p className='seller-sidebar-text'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
