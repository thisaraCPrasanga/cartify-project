import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import inngestRoutes from './routes/inngest.js';

// Config
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB Connection
connectDB();

// API Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/inngest', inngestRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
