import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
// import Collection from './pages/Collection' // If exists
// import About from './pages/About' // If exists
// import Contact from './pages/Contact' // If exists
import Product from './pages/Product'
import Cart from './pages/Cart'
// import Login from './pages/Login' // If exists
// import PlaceOrder from './pages/PlaceOrder' // If exists
import MyOrders from './pages/MyOrders'
import OrderPlaced from './pages/OrderPlaced.jsx'
import AllProducts from './pages/AllProducts'
import AddAddress from './pages/AddAddress'

// Seller Pages
import SellerPage from './pages/Seller/SellerPage'
import SellerOrders from './pages/Seller/SellerOrders'
import ProductList from './pages/Seller/ProductList'
import SellerLayout from './pages/Seller/SellerLayout'
// import SellerAddProduct from './pages/Seller/AddProduct' // Check if exists

const App = () => {
    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/all-products' element={<AllProducts />} />
                {/* <Route path='/collection' element={<Collection />} /> */}
                {/* <Route path='/about' element={<About />} /> */}
                {/* <Route path='/contact' element={<Contact />} /> */}
                <Route path='/product/:id' element={<Product />} />
                <Route path='/cart' element={<Cart />} />
                {/* <Route path='/login' element={<Login />} /> */}
                {/* <Route path='/place-order' element={<PlaceOrder />} /> */}
                <Route path='/my-orders' element={<MyOrders />} />
                <Route path='/order-placed' element={<OrderPlaced />} />
                <Route path='/add-address' element={<AddAddress />} />

                {/* Seller Routes */}
                <Route path='/seller' element={<SellerLayout />}>
                    <Route index element={<SellerPage />} />
                    <Route path='orders' element={<SellerOrders />} />
                    <Route path='product-list' element={<ProductList />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
