import React from 'react'
import { assets } from '../../assets/assets'

import { useAppContext } from '@/context/AppContext'

import "./Navbar.css";

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='seller-navbar-container'>
      <img onClick={() => router.push('/')} className='seller-navbar-logo' src={assets.logo} alt="" />
      <button onClick={() => router.push('/')} className='seller-navbar-logout-btn'>Logout</button>
    </div>
  )
}

export default Navbar