# Backend Architecture & Integration Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Backend Architecture](#backend-architecture)
4. [Database Integration (MongoDB)](#database-integration-mongodb)
5. [Authentication & Authorization (Clerk)](#authentication--authorization-clerk)
6. [Cloud Storage (Cloudinary)](#cloud-storage-cloudinary)
7. [Background Jobs (Inngest)](#background-jobs-inngest)
8. [API Endpoints](#api-endpoints)
9. [Running the Application](#running-the-application)

---

## Overview

This is a full-stack e-commerce application built with a modern JavaScript stack. The application features user authentication, product management, cart functionality, order processing, and role-based access control (buyers and sellers).

---

## Technology Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Routing**: React Router DOM 7.1.1
- **Styling**: Tailwind CSS 3.4.17 + Custom CSS
- **UI Components**: React Icons
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios 1.7.9
- **Authentication**: Clerk React SDK 5.22.6

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **Language**: JavaScript (ES Modules)
- **Database**: MongoDB (via Mongoose 9.1.1)
- **Authentication**: Clerk SDK for Node 4.13.23
- **File Upload**: Multer 2.0.2
- **Cloud Storage**: Cloudinary 2.8.0
- **Background Jobs**: Inngest 3.48.1
- **Environment Variables**: dotenv 17.2.3
- **CORS**: cors 2.8.5
- **Dev Tool**: nodemon 3.1.11

---

## Backend Architecture

### Directory Structure
```
server/
├── config/
│   ├── db.js              # MongoDB connection configuration
│   └── inngest.js         # Inngest client and function definitions
├── middleware/
│   └── authSeller.js      # Middleware to verify seller role
├── models/
│   ├── Address.js         # Address schema
│   ├── Order.js           # Order schema
│   ├── product.js         # Product schema
│   └── user.js            # User schema
├── routes/
│   ├── cartRoutes.js      # Cart-related endpoints
│   ├── inngest.js         # Inngest webhook handler
│   ├── orderRoutes.js     # Order-related endpoints
│   ├── productRoutes.js   # Product-related endpoints
│   └── userRoutes.js      # User-related endpoints
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── server.js              # Main server entry point
```

### Server Entry Point (`server.js`)

The main server file initializes Express, sets up middleware, connects to MongoDB, and registers API routes.

**Key Functions:**
```javascript
// Import dependencies
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());              // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());                      // Enable CORS for frontend

// Database connection
connectDB();

// API Routes
app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/inngest', inngestRoutes);

// Start server
app.listen(PORT);
```

---

## Database Integration (MongoDB)

### Connection Setup (`config/db.js`)

MongoDB is used as the primary database for storing users, products, orders, and addresses.

**Connection Function:**
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/cartify`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
```

### How It Works:
1. **Connection String**: Retrieved from environment variable `MONGODB_URI`
2. **Database Name**: `quickcart`
3. **Error Handling**: Process exits if connection fails
4. **Mongoose ODM**: Provides schema-based modeling for data

### Environment Variables Required:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
```

### Data Models:
- **User**: Stores user information synced from Clerk
- **Product**: Stores product details with Cloudinary image URLs
- **Order**: Stores order information
- **Address**: Stores shipping addresses

---

## Authentication & Authorization (Clerk)

### Overview
Clerk provides complete user authentication and management out of the box.

### Frontend Integration
```javascript
import { ClerkProvider } from '@clerk/clerk-react';

// Wrap app with ClerkProvider
<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <App />
</ClerkProvider>
```

### Backend Integration

#### 1. **Route Protection**
```javascript
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Protected route
router.post('/add', ClerkExpressRequireAuth(), async (req, res) => {
    const { userId } = req.auth; // User ID from Clerk
    // Handle request
});
```

#### 2. **Role-Based Authorization** (`middleware/authSeller.js`)
```javascript
import { clerkClient } from '@clerk/clerk-sdk-node';

const authSeller = async (req, res, next) => {
    const { userId } = req.auth;
    const user = await clerkClient.users.getUser(userId);
    
    if (user.publicMetadata.role === 'seller') {
        next(); // Allow access
    } else {
        return res.status(403).json({ message: "Seller access required" });
    }
};
```

### How Clerk Helps:
- ✅ **User Authentication**: Sign up, sign in, sign out
- ✅ **Session Management**: Secure session handling
- ✅ **User Metadata**: Store custom data like roles (buyer/seller)
- ✅ **Webhooks**: Sync user data to MongoDB via Inngest
- ✅ **Security**: Built-in security features and CSRF protection

### Environment Variables Required:
```
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

---

## Cloud Storage (Cloudinary)

### Overview
Cloudinary handles all product image uploads and storage with automatic optimization.

### Configuration (`routes/productRoutes.js`)
```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
```

### Upload Process

#### 1. **Multer for File Handling**
```javascript
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });
```

#### 2. **Upload to Cloudinary**
```javascript
router.post('/add', upload.array('images'), async (req, res) => {
    const files = req.files;
    
    // Upload each file to Cloudinary
    const result = await Promise.all(
        files.map(async (file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.buffer);
            });
        })
    );
    
    // Extract secure URLs
    const images = result.map((image) => image.secure_url);
});
```

### How Cloudinary Helps:
- ✅ **Image Storage**: Reliable cloud storage for product images
- ✅ **Automatic Optimization**: Images are optimized for web delivery
- ✅ **CDN Delivery**: Fast image delivery via global CDN
- ✅ **Transformation**: Can resize, crop, and transform images on-the-fly
- ✅ **Security**: Secure URLs for image access

### Environment Variables Required:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Background Jobs (Inngest)

### Overview
Inngest handles asynchronous background tasks, particularly for syncing Clerk user data to MongoDB and processing orders.

### Configuration (`config/inngest.js`)

#### 1. **Client Setup**
```javascript
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "quickcart-express" });
```

#### 2. **User Creation Function**
```javascript
export const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url, public_metadata } = event.data;
        
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url,
            role: public_metadata.role || "user"
        };
        
        await connectDB();
        await User.create(userData);
        
        return { success: true, message: "User created successfully" };
    }
);
```

#### 3. **User Update Function**
```javascript
export const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url, public_metadata } = event.data;
        
        const userData = {
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url,
            role: public_metadata.role || "user"
        };
        
        await connectDB();
        await User.findByIdAndUpdate(id, userData, { new: true });
        
        return { success: true, message: "User updated successfully" };
    }
);
```

#### 4. **User Deletion Function**
```javascript
export const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-from-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        const { id } = event.data;
        
        await connectDB();
        await User.findByIdAndDelete(id);
        
        return { success: true, message: "User deleted successfully" };
    }
);
```

#### 5. **Order Creation Function (with Batching)**
```javascript
export const createUserOrder = inngest.createFunction(
    {
        id: 'create-user-order',
        batchEvents: {
            maxSize: 5,      // Process up to 5 orders at once
            timeout: '5s'    // Wait max 5 seconds for batching
        }
    },
    { event: 'order/created' },
    async ({ events }) => {
        const orders = events.map((event) => ({
            userId: event.data.userId,
            items: event.data.items,
            amount: event.data.amount,
            address: event.data.address,
            date: event.data.date
        }));
        
        await connectDB();
        await Order.insertMany(orders);
        
        return { success: true, processed: orders.length };
    }
);
```

### Inngest Route Handler (`routes/inngest.js`)
```javascript
import { serve } from "inngest/express";

const inngestHandler = serve({
    client: inngest,
    functions: [
        syncUserCreation,
        syncUserUpdation,
        syncUserDeletion,
        createUserOrder
    ],
});

router.use('/', inngestHandler);
```

### How Inngest Helps:
- ✅ **Event-Driven**: Triggers functions based on events
- ✅ **Reliability**: Automatic retries on failure
- ✅ **Async Processing**: Offloads heavy tasks from main request flow
- ✅ **Batching**: Can batch multiple events for efficient processing
- ✅ **Real-time Sync**: Keeps MongoDB in sync with Clerk user changes
- ✅ **Monitoring**: Built-in logging and monitoring

### Workflow:
1. **Clerk Webhook** → Triggers event (user.created, user.updated, user.deleted)
2. **Inngest** → Receives event and executes corresponding function
3. **MongoDB** → User data is created/updated/deleted
4. **Order Processing** → Orders are batched and inserted into database

---

## API Endpoints

### Product Routes (`/api/product`)
- `GET /list` - Get all products
- `GET /seller-list` - Get products for sellers (authenticated, seller role required)
- `POST /add` - Add new product (authenticated, seller role required, with image upload)

### User Routes (`/api/user`)
- User profile management endpoints

### Order Routes (`/api/order`)
- Order creation and management endpoints

### Cart Routes (`/api/cart`)
- Shopping cart operations

### Inngest Routes (`/api/inngest`)
- Webhook endpoint for Inngest events

---

## Running the Application

### Prerequisites
1. Node.js installed
2. MongoDB Atlas account (or local MongoDB)
3. Clerk account
4. Cloudinary account
5. Inngest account

### Environment Setup

#### Frontend (`.env` in root)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

#### Backend (`.env` in server folder)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# OR start production server
npm start
```

Server runs on: `http://localhost:5000`

### Running the Frontend

```bash
# In project root (where client package.json is)
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Development Proxy

The Vite config includes a proxy to forward API requests from the frontend to the backend:

```javascript
proxy: {
    '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
    }
}
```

This allows the frontend to make requests to `/api/*` which are automatically forwarded to `http://localhost:5000/api/*`.

---

## Complete Data Flow Example

### Adding a Product
1. **Seller** fills out product form on frontend with images
2. **Frontend** sends POST request to `/api/product/add` with form data and files
3. **Clerk** authenticates the request and provides `userId`
4. **authSeller** middleware verifies seller role via Clerk API
5. **Multer** processes uploaded images into memory
6. **Cloudinary** receives images and returns secure URLs
7. **MongoDB** stores product data with Cloudinary image URLs
8. **Frontend** displays success message via React Hot Toast

### User Registration
1. **User** signs up via Clerk UI component
2. **Clerk** creates user account and triggers webhook
3. **Inngest** receives `clerk/user.created` event
4. **syncUserCreation** function extracts user data
5. **MongoDB** stores user document with Clerk user ID
6. **Application** now has user data available for queries

---

## Key Features

✅ **Secure Authentication**: Clerk handles all auth complexity  
✅ **Role-Based Access**: Sellers can add products, buyers can purchase  
✅ **Cloud Storage**: Images stored reliably on Cloudinary  
✅ **Async Processing**: Background jobs handled by Inngest  
✅ **Data Persistence**: MongoDB stores all application data  
✅ **Scalable Architecture**: Microservices-ready design  
✅ **Modern Stack**: Latest versions of React, Node, and supporting libraries

---

## Summary

This e-commerce application uses a modern, scalable architecture:
- **MongoDB** provides flexible data storage
- **Clerk** handles authentication and user management
- **Cloudinary** manages image uploads and delivery
- **Inngest** processes background tasks asynchronously
- **Express** serves the RESTful API
- **React + Vite** powers the frontend

All services work together seamlessly to create a smooth, performant e-commerce experience.
