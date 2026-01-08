import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import Order from '../models/Order.js';
import product from '../models/product.js'; // Note: check model name casing
import User from '../models/user.js';
import authSeller from '../middleware/authSeller.js';
import connectDB from '../config/db.js';
import { inngest } from '../config/inngest.js';

const router = express.Router();

// POST /api/order/create
router.post('/create', ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const { userId } = req.auth;
        const { address, items } = req.body;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Address or items not found" });
        }

        let amount = 0;
        for (const item of items) {
            const Product = await product.findById(item.product);
            if (Product) {
                amount += Product.offerPrice * item.quantity;
            }
        }


        const orderData = {
            userId,
            items,
            address,
            amount: amount + Math.floor(amount * 0.02),
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        // clear user cart
        await connectDB();
        const user = await User.findById(userId);
        user.cartItems = {};
        await user.save();

        res.json({ success: true, message: "Order created successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
});

// GET /api/order/list
router.get('/list', ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const { userId } = req.auth;
        await connectDB();

        // Ensure models are registered if needed implicitly, but explicit imports should suffice.
        const orders = await Order.find({ userId }).populate('address items.product'); // address is ref String in schema but populated? 
        // Wait, Order schema says address: { type: String, ref: 'Address' }. So populate works if Address model matches.

        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// GET /api/order/seller-orders
router.get('/seller-orders', ClerkExpressRequireAuth(), authSeller, async (req, res) => {
    try {
        const { userId } = req.auth; // Auth middleware ensures this.
        await connectDB();
        const orders = await Order.find({}).populate('address items.product');
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// POST /api/order/status
router.post('/status', ClerkExpressRequireAuth(), authSeller, async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await connectDB();
        await Order.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Order Status Updated' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

export default router;
