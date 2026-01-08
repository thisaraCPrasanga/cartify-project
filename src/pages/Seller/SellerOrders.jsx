
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";

import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

import "./SellerOrders.css";

const Orders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const changeOrderStatus = async (orderId, status) => {
        try {
            const token = await getToken();
            const { data } = await axios.post('/api/order/status', { orderId, status }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (data.success) {
                await fetchSellerOrders();
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchSellerOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/order/seller-orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (data.success) {
                setOrders(data.orders)
                setLoading(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchSellerOrders();
    }, []);

    return (
        <div className="seller-orders-container">
            {loading ? <Loading /> : <div className="seller-orders-content">
                <h2 className="seller-orders-title">Orders</h2>
                <div className="seller-orders-list">
                    {orders.map((order, index) => (
                        <div key={index} className="seller-order-item">
                            <div className="seller-order-product-info">
                                <img
                                    className="seller-order-image"
                                    src={assets.box_icon}
                                    alt="box_icon"
                                />
                                <p className="seller-order-details">
                                    <span className="seller-order-name">
                                        {order.items.map((item) => (item.product ? item.product.name : "Unknown Product") + ` x ${item.quantity}`).join(", ")}
                                    </span>
                                    <span>Items : {order.items.length}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="font-medium">{order.address.fullname}</span>
                                    <br />
                                    <span >{order.address.area}</span>
                                    <br />
                                    <span>{`${order.address.city}, ${order.address.state}`}</span>
                                    <br />
                                    <span>{order.address.phoneNumber}</span>
                                </p>
                            </div>
                            <p className="seller-order-amount">{currency}{order.amount}</p>
                            <div>
                                <p className="seller-order-status-info">
                                    <span className="font-medium">Date : {new Date(order.date).toLocaleDateString()}</span>
                                    <label className="seller-order-status-label">Order Status:</label>
                                    <select
                                        onChange={(event) => changeOrderStatus(order._id, event.target.value)}
                                        value={order.status}
                                        className="seller-order-status-select"
                                    >
                                        <option value="Order Placed">Order Placed</option>
                                        <option value="Packing">Packing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Out for delivery">Out for delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            <Footer />
        </div>
    );
};

export default Orders;