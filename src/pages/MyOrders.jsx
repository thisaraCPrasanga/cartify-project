
import React, { useEffect, useState } from "react";


import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from "@/assets/assets";

import "./MyOrders.css";

const MyOrders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/order/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (data.success && Array.isArray(data.orders)) {
                setOrders(data.orders.reverse())
            } else {
                toast.error(data.message || "Failed to fetch orders")
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        if (user) {
            fetchOrders();
        }

    }, [user]);

    return (
        <>
            <Navbar />
            <div className="my-orders-container">
                <div className="my-orders-content">
                    <h2 className="my-orders-title">My Orders</h2>
                    {loading ? <Loading /> : (<div className="my-orders-list">
                        {orders.map((order, index) => (
                            <div key={index} className="my-order-item">
                                <div className="my-order-product-info">
                                    <img
                                        className="my-order-image"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <p className="my-order-details">
                                        <span className="my-order-name">
                                            {(order.items && Array.isArray(order.items) ? order.items : []).map((item) => (item.product ? item.product.name : "Unknown") + ` x ${item.quantity}`).join(", ")}
                                        </span>
                                        <span>Items : {order.items ? order.items.length : 0}</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-medium">{order.address?.fullname || "Unknown Name"}</span>
                                        <br />
                                        <span >{order.address?.area || ""}</span>
                                        <br />
                                        <span>{order.address ? `${order.address.city}, ${order.address.state}` : ""}</span>
                                        <br />
                                        <span>{order.address?.phoneNumber || ""}</span>
                                    </p>
                                </div>
                                <p className="my-order-amount">{currency} {order.amount}</p>
                                <div>
                                    <p className="my-order-status-info">
                                        <span>Method : COD</span>
                                        <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                        <span>Payment : Pending</span>
                                        <span>Status : <span className="my-order-status">{order.status}</span></span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;