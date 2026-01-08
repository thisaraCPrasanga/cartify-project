import React from 'react'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import { Outlet } from 'react-router-dom'

import "./SellerLayout.css";

const SellerLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='seller-layout-container'>
                <Sidebar />
                <div className='seller-layout-content'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SellerLayout
