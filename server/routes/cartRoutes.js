import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import User from '../models/user.js';
import connectDB from '../config/db.js';

const router = express.Router();

// GET /api/cart/get
router.get('/get', ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const { userId } = req.auth;
        await connectDB();
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const { cartItems } = user;
        res.json({ success: true, cartItems });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// POST /api/cart/update
router.post('/update', ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const { userId } = req.auth;
        const { cartData } = req.body;

        await connectDB();
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        user.cartItems = cartData;
        await user.save();

        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

export default router;
