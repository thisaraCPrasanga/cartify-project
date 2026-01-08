import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import Product from '../models/product.js';
import authSeller from '../middleware/authSeller.js';
import connectDB from '../config/db.js';

const router = express.Router();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /api/product/list
router.get('/list', async (req, res) => {
    try {
        await connectDB();
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// GET /api/product/seller-list
router.get('/seller-list', ClerkExpressRequireAuth(), authSeller, async (req, res) => {
    try {
        await connectDB();
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// POST /api/product/add
router.post('/add', ClerkExpressRequireAuth(), authSeller, upload.array('images'), async (req, res) => {
    try {
        const { userId } = req.auth;
        const { name, description, price, category, offerprice } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.json({ success: false, message: "Please upload at least one image" });
        }

        const result = await Promise.all(
            files.map(async (file) => {
                const buffer = file.buffer;
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(buffer);
                });
            })
        );

        const images = result.map((image) => image.secure_url);

        await connectDB();
        const newProduct = await Product.create({
            userId,
            name,
            description,
            price: Number(price),
            offerPrice: Number(offerprice),
            image: images,
            category,
            date: Date.now()
        });

        res.json({ success: true, message: "Product added successfully", newProduct });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

export default router;
