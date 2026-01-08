# E-Commerce Application - Complete Documentation

> **Full-Stack E-Commerce Platform with React, Node.js, MongoDB, Clerk, Cloudinary, and Inngest**

---

## 📚 Documentation Index

This project contains comprehensive documentation for both frontend and backend:

1. **[FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md)** - Complete frontend architecture, components, and React implementation
2. **[BACKEND_DOCUMENTATION.md](./BACKEND_DOCUMENTATION.md)** - Complete backend architecture, API endpoints, and integrations

---

## 🎯 Project Overview

This is a modern, full-stack e-commerce application that enables users to browse products, manage shopping carts, place orders, and provides sellers with a dedicated dashboard to manage products and orders.

### Key Capabilities

**For Buyers:**
- 🛍️ Browse and search products
- 🛒 Add items to cart
- 💳 Place orders with shipping address
- 📦 Track order history
- 🔐 Secure authentication

**For Sellers:**
- ➕ Add new products with multiple images
- 📊 View product inventory
- 📋 Manage incoming orders
- 🎨 Upload images via Cloudinary
- 🔒 Role-based access control

---

## 🏗️ Architecture Overview

### Tech Stack Summary

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│  React 18 + Vite + Tailwind CSS + React Router         │
│  Clerk Auth + Axios + React Context API                │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │ HTTP/REST API
                      │
┌─────────────────────▼───────────────────────────────────┐
│                     BACKEND                             │
│  Node.js + Express 5 + MongoDB (Mongoose)               │
│  Clerk SDK + Cloudinary + Inngest + Multer             │
└─────────────────────┬───────────────────────────────────┘
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
   MongoDB       Cloudinary      Inngest
   (Database)    (Images)        (Jobs)
```

---

## 🔧 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| Vite | 6.0.5 | Build Tool |
| React Router | 7.1.1 | Routing |
| Tailwind CSS | 3.4.17 | Styling |
| Clerk React | 5.22.6 | Authentication |
| Axios | 1.7.9 | HTTP Client |
| React Hot Toast | 2.5.1 | Notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | - | Runtime |
| Express | 5.2.1 | Web Framework |
| MongoDB | - | Database |
| Mongoose | 9.1.1 | ODM |
| Clerk SDK | 4.13.23 | Auth Backend |
| Cloudinary | 2.8.0 | Image Storage |
| Inngest | 3.48.1 | Background Jobs |
| Multer | 2.0.2 | File Upload |

---

## 📁 Project Structure

```
project-root/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page components
│   │   └── Seller/              # Seller dashboard pages
│   ├── context/                 # React Context providers
│   ├── assets/                  # Static assets
│   ├── App.jsx                  # Root component
│   ├── Providers.jsx            # Provider wrapper
│   └── main.jsx                 # Entry point
│
├── server/                       # Backend source code
│   ├── config/                  # Configuration files
│   │   ├── db.js               # MongoDB connection
│   │   └── inngest.js          # Inngest functions
│   ├── models/                  # Mongoose schemas
│   │   ├── user.js
│   │   ├── product.js
│   │   ├── Order.js
│   │   └── Address.js
│   ├── routes/                  # API route handlers
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── cartRoutes.js
│   │   └── inngest.js
│   ├── middleware/              # Express middleware
│   │   └── authSeller.js       # Seller role check
│   └── server.js                # Server entry point
│
├── public/                       # Static public files
├── FRONTEND_DOCUMENTATION.md     # Frontend docs
├── BACKEND_DOCUMENTATION.md      # Backend docs
├── README.md                     # This file
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration
└── .env                         # Environment variables
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Clerk account
- Cloudinary account
- Inngest account (optional for background jobs)

### 1. Clone & Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Setup

**Frontend `.env` (project root):**
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_CURRENCY=$
```

**Backend `.env` (server folder):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### 4. Access Application

Open browser to: `http://localhost:5173`

---

## 🔑 Key Features Explained

### 1. Authentication (Clerk)
- **Secure Sign-up/Sign-in**: Handled entirely by Clerk
- **Role-Based Access**: Users assigned "buyer" or "seller" roles
- **Seamless Integration**: Frontend and backend use Clerk SDK
- **Token-Based API**: JWT tokens for protected routes

### 2. Image Management (Cloudinary)
- **Multi-Image Upload**: Sellers can upload multiple product images
- **Cloud Storage**: Images stored on Cloudinary CDN
- **Automatic Optimization**: Images optimized for web delivery
- **Secure URLs**: Product images served via HTTPS

### 3. Background Jobs (Inngest)
- **User Sync**: Automatically syncs Clerk users to MongoDB
- **Event-Driven**: Triggers on user.created, user.updated, user.deleted
- **Order Processing**: Batches and processes orders asynchronously
- **Reliability**: Automatic retries on failure

### 4. Database (MongoDB)
- **Document Storage**: Flexible schema for users, products, orders
- **Mongoose ODM**: Schema validation and relationships
- **Cloud Hosting**: MongoDB Atlas for production
- **Data Models**:
  - User (synced from Clerk)
  - Product (with Cloudinary image URLs)
  - Order (with user and product references)
  - Address (shipping information)

---

## 🌊 Data Flow Examples

### Example 1: User Registration
```
1. User signs up → Clerk UI
2. Clerk creates account → Triggers webhook
3. Inngest receives event → clerk/user.created
4. Inngest function executes → Syncs to MongoDB
5. User document created → Available for queries
```

### Example 2: Adding a Product (Seller)
```
1. Seller fills form → Upload images
2. Frontend sends request → /api/product/add
3. Clerk verifies token → Authenticates user
4. authSeller middleware → Verifies seller role
5. Multer processes files → Uploads to Cloudinary
6. Cloudinary returns URLs → Secure image links
7. MongoDB stores product → With image URLs
8. Frontend shows success → Toast notification
```

### Example 3: Placing an Order (Buyer)
```
1. User adds items → Cart (Context API)
2. User enters address → AddAddress page
3. User confirms order → API request
4. Backend creates order → Sends Inngest event
5. Inngest processes order → Saves to MongoDB
6. User redirected → Order confirmation page
```

---

## 🛣️ API Endpoints Summary

### Product Routes (`/api/product`)
- `GET /list` - Get all products (public)
- `GET /seller-list` - Get seller's products (protected, seller only)
- `POST /add` - Add new product (protected, seller only, with image upload)

### User Routes (`/api/user`)
- `GET /data` - Get user data (protected)
- `POST /update` - Update user profile (protected)

### Cart Routes (`/api/cart`)
- `POST /update` - Update cart items (protected)

### Order Routes (`/api/order`)
- `POST /create` - Create new order (protected)
- `GET /list` - Get user orders (protected)

### Inngest Routes (`/api/inngest`)
- `ALL /` - Inngest webhook handler

---

## 🎨 Frontend Highlights

### Component Architecture
- **Functional Components**: Modern React with hooks
- **Context API**: Global state management
- **Component Isolation**: Each component with its own CSS file
- **Reusability**: Shared components like ProductCard, Navbar

### Pages Structure
- **Public Pages**: Home, AllProducts, Product
- **User Pages**: Cart, MyOrders, AddAddress, OrderPlaced
- **Seller Pages**: SellerPage, ProductList, SellerOrders (nested routes)

### Styling Approach
- **Hybrid System**: Tailwind CSS + Custom CSS
- **Responsive Design**: Mobile-first approach
- **Custom Animations**: Component-specific effects
- **Consistent Theme**: Global styles in index.css

### State Management
- **AppContext**: Centralized state (products, cart, user)
- **Local State**: Component-specific state with useState
- **Derived State**: Calculated values (cart count, total amount)

---

## 🔒 Security Features

✅ **JWT Authentication**: Token-based API access  
✅ **Role-Based Authorization**: Middleware checks user roles  
✅ **Secure Image Storage**: Cloudinary with signed URLs  
✅ **CORS Protection**: Configured for frontend origin  
✅ **Environment Variables**: Sensitive data in .env files  
✅ **Input Validation**: Server-side validation  

---

## 📊 Development Workflow

### Development Mode
```bash
# Backend with auto-reload
cd server && npm run dev

# Frontend with HMR
npm run dev
```

### Building for Production
```bash
# Build frontend
npm run build

# The build outputs to ./dist

# Backend runs as-is
cd server && npm start
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Preview production build
npm run preview
```

---

## 🤝 Contributing Guidelines

1. **Code Style**: Follow existing patterns (functional components, hooks)
2. **File Organization**: Place components in `src/components/`, pages in `src/pages/`
3. **CSS Pattern**: Create `.css` file for each component/page
4. **API Calls**: Use `AppContext` for shared data, axios for HTTP
5. **Error Handling**: Always wrap API calls in try-catch with toast notifications

---

## 📝 Additional Resources

- **[Frontend Documentation](./FRONTEND_DOCUMENTATION.md)** - Deep dive into React architecture
- **[Backend Documentation](./BACKEND_DOCUMENTATION.md)** - API details and integrations

---

## 🐛 Troubleshooting

### Common Issues

**Frontend won't start:**
- Check if backend is running on port 5000
- Verify `.env` has `VITE_CLERK_PUBLISHABLE_KEY`
- Run `npm install` to ensure all dependencies are installed

**Backend won't start:**
- Verify MongoDB connection string in `.env`
- Check if port 5000 is available
- Ensure `server/.env` has all required variables

**Clerk authentication errors:**
- Verify publishable and secret keys match
- Check Clerk dashboard for webhook configuration
- Ensure frontend and backend use same Clerk account

**Images not uploading:**
- Verify Cloudinary credentials in `server/.env`
- Check file size limits (Multer configuration)
- Ensure Cloudinary account is active

---

## 📈 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced search with filters
- [ ] Product reviews and ratings
- [ ] Email notifications for orders
- [ ] Admin dashboard for site management
- [ ] Analytics and reporting
- [ ] Inventory management
- [ ] Coupon/discount system

---

## 📄 License

This project is for educational purposes.

---

## 👥 Support

For detailed implementation information, refer to:
- [FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md)
- [BACKEND_DOCUMENTATION.md](./BACKEND_DOCUMENTATION.md)

---

**Built with ❤️ using React, Node.js, MongoDB, Clerk, Cloudinary, and Inngest**
