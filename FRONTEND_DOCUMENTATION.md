# Frontend Architecture & Integration Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Frontend Architecture](#frontend-architecture)
4. [Application Structure](#application-structure)
5. [State Management](#state-management)
6. [Routing System](#routing-system)
7. [Components](#components)
8. [Pages](#pages)
9. [Styling Approach](#styling-approach)
10. [Authentication Flow](#authentication-flow)
11. [API Integration](#api-integration)
12. [Running the Frontend](#running-the-frontend)

---

## Overview

This is the frontend client for a full-stack e-commerce application built with React and Vite. The application provides a modern, responsive user interface for both buyers and sellers, with features including product browsing, cart management, order processing, and a dedicated seller dashboard.

---

## Technology Stack

### Core Framework
- **React**: 18.3.1 - UI library
- **React DOM**: 18.3.1 - DOM rendering
- **Vite**: 6.0.5 - Build tool and dev server

### Routing & Navigation
- **React Router DOM**: 7.1.1 - Client-side routing

### State Management
- **React Context API** - Global state management
- **React Hooks** - Local state and side effects

### Authentication
- **Clerk React SDK**: 5.22.6 - User authentication and management

### HTTP Client
- **Axios**: 1.7.9 - API requests

### UI & Styling
- **Tailwind CSS**: 3.4.17 - Utility-first CSS framework
- **Custom CSS** - Component-specific styling
- **React Icons**: 5.5.0 - Icon library

### Notifications
- **React Hot Toast**: 2.5.1 - Toast notifications

### Dev Tools
- **ESLint**: 9.17.0 - Code linting
- **PostCSS**: 8.4.49 - CSS processing
- **Autoprefixer**: 10.4.20 - CSS vendor prefixing

---

## Frontend Architecture

### Project Structure
```
src/
├── assets/              # Static assets (images, icons)
│   └── assets.jsx       # Asset exports
├── components/          # Reusable UI components
│   ├── Banner.jsx/css
│   ├── FeaturedProduct.jsx/css
│   ├── Footer.jsx/css
│   ├── HeaderSlider.jsx/css
│   ├── HomeProducts.jsx/css
│   ├── Loading.jsx/css
│   ├── Navbar.jsx/css
│   ├── NewsLetter.jsx/css
│   ├── OrderSummary.jsx/css
│   ├── ProductCard.jsx/css
│   └── Sidebar.jsx/css
├── context/             # React Context providers
│   └── AppContext.jsx   # Global app state
├── pages/               # Page-level components
│   ├── AddAddress.jsx/css
│   ├── AllProducts.jsx/css
│   ├── Cart.jsx/css
│   ├── Home.jsx/css
│   ├── MyOrders.jsx/css
│   ├── OrderPlaced.jsx/css
│   ├── Product.jsx/css
│   └── Seller/          # Seller-specific pages
│       ├── SellerPage.jsx/css
│       ├── SellerOrders.jsx/css
│       ├── ProductList.jsx/css
│       └── SellerLayout.jsx/css
├── App.jsx              # Root app component
├── App.css              # App-level styles
├── Providers.jsx        # Provider wrapper component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

---

## Application Structure

### Entry Point (`main.jsx`)

The main entry point sets up the React application with error boundaries and provider wrappers.

**Key Features:**
```javascript
// Error Boundary for catching and displaying errors
class ErrorBoundary extends React.Component {
    // Catches errors and displays fallback UI
}

// Root render with providers
ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <Providers>
            <App />
        </Providers>
    </ErrorBoundary>
)
```

**Error Handling:**
- Custom ErrorBoundary component catches runtime errors
- Displays error details in development mode
- Prevents entire app crash on component errors

---

### Provider Wrapper (`Providers.jsx`)

Centralizes all application providers in a single component for clean architecture.

**Provider Hierarchy:**
```javascript
<ClerkProvider>              // Authentication
  <BrowserRouter>            // Routing
    <AppContextProvider>     // Global state
      {children}
      <Toaster />            // Notifications
    </AppContextProvider>
  </BrowserRouter>
</ClerkProvider>
```

**Purpose:**
- ✅ Single source of truth for provider configuration
- ✅ Prevents multiple ClerkProvider instances
- ✅ Clean separation of concerns
- ✅ Easy to maintain and extend

---

### Root App Component (`App.jsx`)

Defines the application routing structure and layout.

**Routes Structure:**
```javascript
// Public Routes
<Route path='/' element={<Home />} />
<Route path='/all-products' element={<AllProducts />} />
<Route path='/product/:id' element={<Product />} />
<Route path='/cart' element={<Cart />} />

// User Routes
<Route path='/my-orders' element={<MyOrders />} />
<Route path='/order-placed' element={<OrderPlaced />} />
<Route path='/add-address' element={<AddAddress />} />

// Seller Routes (Nested)
<Route path='/seller' element={<SellerLayout />}>
    <Route index element={<SellerPage />} />
    <Route path='orders' element={<SellerOrders />} />
    <Route path='product-list' element={<ProductList />} />
</Route>
```

**Layout:**
- Responsive padding: `px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`
- Nested seller routes for dashboard functionality
- Dynamic product routes with URL parameters

---

## State Management

### Global State (AppContext)

The `AppContext.jsx` provides centralized state management for the entire application.

#### Context Values

**User & Authentication:**
```javascript
const { user } = useUser()        // Clerk user object
const { getToken } = useAuth()    // JWT token retrieval
const [userData, setUserData] = useState(false)  // User data from backend
const [isSeller, setIsSeller] = useState(false)  // Role flag
```

**Products & Cart:**
```javascript
const [products, setProducts] = useState([])       // All products
const [cartItems, setCartItems] = useState({})     // Cart state
```

**UI State:**
```javascript
const [search, setSearch] = useState('')           // Search query
const [showSearch, setShowSearch] = useState(true) // Search visibility
```

**Navigation:**
```javascript
const navigate = useNavigate()
const router = {
    push: (path) => navigate(path),
    replace: (path) => navigate(path, { replace: true }),
    back: () => navigate(-1)
}
```

#### Key Functions

**1. Fetch Product Data**
```javascript
const fetchProductData = async () => {
    const { data } = await axios.get('/api/product/list')
    if (data.success) {
        setProducts(data.products)
    }
}
```

**2. Fetch User Data**
```javascript
const fetchUserData = async () => {
    // Check if user is seller
    if (user.publicMetadata.role === 'seller') {
        setIsSeller(true)
    }
    
    // Fetch user data from backend
    const token = await getToken()
    const { data } = await axios.get('/api/user/data', {
        headers: { Authorization: `Bearer ${token}` }
    })
    
    setUserData(data.user)
    setCartItems(data.user.cartItems)
}
```

**3. Add to Cart**
```javascript
const addToCart = async (itemId) => {
    // Update local state
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
        cartData[itemId] += 1
    } else {
        cartData[itemId] = 1
    }
    setCartItems(cartData)
    toast.success("Product added to cart")
    
    // Sync with backend
    if (user) {
        const token = await getToken()
        await axios.post('/api/cart/update', { cartData }, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}
```

**4. Update Cart Quantity**
```javascript
const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems)
    
    if (quantity === 0) {
        delete cartData[itemId]  // Remove item
    } else {
        cartData[itemId] = quantity
    }
    
    setCartItems(cartData)
    
    // Sync with backend
    if (user) {
        const token = await getToken()
        await axios.post('/api/cart/update', { cartData }, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}
```

**5. Cart Calculations**
```javascript
// Get total item count
const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItems) {
        if (cartItems[items] > 0) {
            totalCount += cartItems[items]
        }
    }
    return totalCount
}

// Get total cart amount
const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
        let itemInfo = products.find((product) => product._id === items)
        if (itemInfo && cartItems[items] > 0) {
            totalAmount += itemInfo.offerPrice * cartItems[items]
        }
    }
    return Math.floor(totalAmount * 100) / 100
}
```

#### Lifecycle Effects

**Load Products on Mount:**
```javascript
useEffect(() => {
    fetchProductData()
}, [])
```

**Load User Data on Authentication:**
```javascript
useEffect(() => {
    if (user) {
        fetchUserData()
    }
}, [user])
```

---

## Routing System

### Route Categories

#### **1. Public Routes**
Routes accessible to all visitors:
- `/` - Home page with featured products
- `/all-products` - Browse all products
- `/product/:id` - Individual product details

#### **2. User Routes**
Routes for authenticated users:
- `/cart` - Shopping cart
- `/my-orders` - Order history
- `/order-placed` - Order confirmation
- `/add-address` - Add/edit shipping address

#### **3. Seller Routes**
Nested routes for sellers (protected by role):
- `/seller` - Seller dashboard
- `/seller/orders` - Manage orders
- `/seller/product-list` - Manage products

### Dynamic Routes
- `/product/:id` - Uses URL parameter to fetch specific product

---

## Components

### Navigation Components

#### **Navbar** (`Navbar.jsx`)
**Features:**
- User authentication status display
- Cart icon with item count
- Search functionality toggle
- Seller dashboard link (if user has seller role)
- Responsive mobile menu

**Integration:**
```javascript
const { user } = useAppContext()
const { isSeller } = useAppContext()
const { getCartCount } = useAppContext()
```

#### **Sidebar** (`Sidebar.jsx`)
**Features:**
- Mobile navigation menu
- Category filtering
- User profile section

#### **Footer** (`Footer.jsx`)
**Features:**
- Site links
- Contact information
- Social media links
- Responsive layout

---

### Product Components

#### **ProductCard** (`ProductCard.jsx`)
**Features:**
- Product image display
- Product name and pricing
- Offer price highlighting
- Link to product details

**Props:**
```javascript
{
    _id,
    name,
    images,
    price,
    offerPrice
}
```

#### **FeaturedProduct** (`FeaturedProduct.jsx`)
**Features:**
- Horizontal scrollable product list
- Featured product highlights
- Quick add to cart
- Responsive carousel

#### **HomeProducts** (`HomeProducts.jsx`)
**Features:**
- Product grid layout
- Filtering capabilities
- Search integration

---

### Shopping Components

#### **OrderSummary** (`OrderSummary.jsx`)
**Features:**
- Line item display
- Price breakdown
- Subtotal calculation
- Delivery fee display
- Total amount calculation
- Promo code input

**Integration:**
```javascript
const { getCartAmount, cartItems, products } = useAppContext()
```

---

### UI Components

#### **HeaderSlider** (`HeaderSlider.jsx`)
**Features:**
- Automatic image carousel
- Manual navigation controls
- Responsive images
- Smooth transitions

#### **Banner** (`Banner.jsx`)
**Features:**
- Promotional banners
- Call-to-action buttons
- Responsive design

#### **NewsLetter** (`NewsLetter.jsx`)
**Features:**
- Email subscription form
- Form validation
- Success/error messaging

#### **Loading** (`Loading.jsx`)
**Features:**
- Loading spinner
- Used during data fetching
- Consistent loading states

---

## Pages

### Customer Pages

#### **Home** (`Home.jsx`)
**Components Used:**
- Navbar
- HeaderSlider
- FeaturedProduct
- Banner
- NewsLetter
- Footer

**Purpose:** Landing page with featured content and promotions

#### **AllProducts** (`AllProducts.jsx`)
**Features:**
- Product grid display
- Search and filter
- Pagination (if implemented)
- Sort options

**Data Source:**
```javascript
const { products } = useAppContext()
```

#### **Product** (`Product.jsx`)
**Features:**
- Product image gallery
- Detailed product information
- Price and offer display
- Add to cart button
- Related products section

**Route Parameter:**
```javascript
const { id } = useParams()  // Product ID from URL
```

#### **Cart** (`Cart.jsx`)
**Features:**
- Cart item list
- Quantity adjustment
- Remove item option
- Order summary
- Checkout button

**State Management:**
```javascript
const { cartItems, updateCartQuantity, getCartAmount } = useAppContext()
```

#### **MyOrders** (`MyOrders.jsx`)
**Features:**
- Order history display
- Order status tracking
- Order details view
- Reorder functionality

#### **OrderPlaced** (`OrderPlaced.jsx`)
**Features:**
- Order confirmation message
- Order number display
- Continue shopping button

#### **AddAddress** (`AddAddress.jsx`)
**Features:**
- Address form (name, street, city, state, zip, country, phone)
- Form validation
- Save address to backend
- Navigate to checkout

---

### Seller Pages

#### **SellerLayout** (`Seller/SellerLayout.jsx`)
**Purpose:**
- Wrapper for all seller routes
- Seller navigation sidebar
- Outlet for nested routes

**Structure:**
```javascript
<div className="seller-layout">
    <Sidebar />
    <Outlet />  // Renders child routes
</div>
```

#### **SellerPage** (`Seller/SellerPage.jsx`)
**Features:**
- Add product form
- Image upload (multiple images)
- Product details input
- Category selection
- Price and offer price
- Submit to backend

**API Integration:**
```javascript
const formData = new FormData()
formData.append('name', productName)
formData.append('price', price)
formData.append('offerPrice', offerPrice)
// ... append images
images.forEach(image => formData.append('images', image))

const token = await getToken()
await axios.post('/api/product/add', formData, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
})
```

#### **ProductList** (`Seller/ProductList.jsx`)
**Features:**
- Display all seller's products
- Edit product button
- Delete product button
- Product status (active/inactive)

**Data Fetching:**
```javascript
const token = await getToken()
const { data } = await axios.get('/api/product/seller-list', {
    headers: { Authorization: `Bearer ${token}` }
})
```

#### **SellerOrders** (`Seller/SellerOrders.jsx`)
**Features:**
- Display orders for seller's products
- Order status management
- Update order status
- Order details view
- Filter by status

---

## Styling Approach

### Hybrid Styling System

The application uses a **hybrid approach** combining Tailwind CSS and custom CSS:

#### **1. Tailwind CSS**
Used for:
- Layout utilities (padding, margin, flexbox, grid)
- Responsive design breakpoints
- Quick prototyping

**Examples:**
```javascript
className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'
```

#### **2. Custom CSS**
Each component has its own CSS file for:
- Component-specific styling
- Complex animations
- Custom visual effects
- Brand-specific design

**Pattern:**
```
ComponentName.jsx
ComponentName.css
```

**Example (`ProductCard.css`):**
```css
.product-card {
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
}
```

#### **3. Global Styles** (`index.css`)

**Features:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
    scroll-behavior: smooth;
}

/* Hide number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Hide scrollbar */
::-webkit-scrollbar {
    display: none;
}
```

---

## Authentication Flow

### Clerk Integration

#### **1. Provider Setup**
```javascript
<ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
    {/* App */}
</ClerkProvider>
```

#### **2. User Access**
```javascript
import { useUser, useAuth } from '@clerk/clerk-react'

const { user, isLoaded, isSignedIn } = useUser()
const { getToken } = useAuth()
```

#### **3. Protected Routes**
Routes check authentication status:
```javascript
if (!user) {
    // Redirect to sign in
    navigate('/sign-in')
}
```

#### **4. Role-Based Access**
```javascript
// Check if user is seller
if (user.publicMetadata.role === 'seller') {
    setIsSeller(true)
    // Allow access to seller routes
}
```

#### **5. Token-Based API Requests**
```javascript
const token = await getToken()
const response = await axios.get('/api/protected', {
    headers: { Authorization: `Bearer ${token}` }
})
```

---

## API Integration

### Axios Configuration

#### **Base Setup**
Vite proxy forwards `/api` requests to backend:
```javascript
// vite.config.js
proxy: {
    '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
    }
}
```

#### **API Request Pattern**

**GET Request:**
```javascript
const { data } = await axios.get('/api/product/list')
```

**Authenticated GET:**
```javascript
const token = await getToken()
const { data } = await axios.get('/api/user/data', {
    headers: { Authorization: `Bearer ${token}` }
})
```

**POST Request:**
```javascript
const token = await getToken()
await axios.post('/api/cart/update', { cartData }, {
    headers: { Authorization: `Bearer ${token}` }
})
```

**File Upload:**
```javascript
const formData = new FormData()
formData.append('name', productName)
formData.append('images', imageFile)

const token = await getToken()
await axios.post('/api/product/add', formData, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
})
```

### Error Handling

```javascript
try {
    const response = await axios.get('/api/data')
    if (response.data.success) {
        // Handle success
    } else {
        toast.error(response.data.message)
    }
} catch (error) {
    toast.error(error.message)
}
```

---

## Running the Frontend

### Prerequisites
1. Node.js installed (v16 or higher recommended)
2. Backend server running on `http://localhost:5000`
3. Clerk account with publishable key

### Environment Setup

Create `.env` file in project root:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_CURRENCY=$
```

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Server
- **URL**: `http://localhost:5173`
- **Hot Module Replacement (HMR)**: Enabled
- **Port**: 5173 (configurable in `vite.config.js`)

### Build Output
```bash
npm run build
# Builds to ./dist directory
```

---

## Key Features

✅ **Modern React Architecture**: Hooks, Context API, functional components  
✅ **Responsive Design**: Mobile-first approach with Tailwind CSS  
✅ **Authentication**: Seamless integration with Clerk  
✅ **Real-time Updates**: Optimistic UI updates with backend sync  
✅ **Error Handling**: Error boundaries and toast notifications  
✅ **Type Safety**: ESLint for code quality  
✅ **Fast Development**: Vite for instant HMR  
✅ **Role-Based UI**: Different interfaces for buyers and sellers  
✅ **Cart Persistence**: Cart synced with backend for logged-in users  

---

## Complete User Flow Examples

### **Shopping Flow (Buyer)**
1. **Home Page** → Browse featured products
2. **Product Page** → View details, add to cart
3. **Cart** → Review items, adjust quantities
4. **Add Address** → Enter shipping information
5. **Order Placed** → Confirmation page

### **Product Management Flow (Seller)**
1. **Login** → Clerk authentication
2. **Seller Dashboard** → Navigate to `/seller`
3. **Add Product** → Fill form, upload images
4. **Product List** → View all products
5. **Manage Orders** → View and update order status

---

## Summary

The frontend is built with modern React best practices:
- **React 18** with functional components and hooks
- **Vite** for blazing-fast development
- **Clerk** for authentication
- **Context API** for state management
- **Axios** for API communication
- **Tailwind CSS + Custom CSS** for styling
- **React Router** for navigation

The architecture is modular, maintainable, and scalable, with clear separation between components, pages, and business logic.
