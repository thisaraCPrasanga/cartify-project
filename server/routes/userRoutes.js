import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import User from '../models/user.js';
import Address from '../models/Address.js';
import connectDB from '../config/db.js';

const router = express.Router();

// GET /api/user/data
router.get('/data', ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const { userId } = req.auth;
        await connectDB();
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// POST /api/user/add-address
router.post('/add-address', ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const { userId } = req.auth;
        const { address } = req.body;

        await connectDB();
        const newAddress = await Address.create({ ...address, userId });

        res.json({ success: true, message: "Address added successfully", newAddress });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// GET /api/user/get-address (Placeholder, will confirm logic after reading file)
// Assuming it fetches addresses for the user
router.get('/get-address', ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const { userId } = req.auth;
        await connectDB();
        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

export default router;
