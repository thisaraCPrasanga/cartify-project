'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'

import { useEffect } from 'react'

import "./OrderPlaced.css";

const OrderPlaced = () => {

  const { router } = useAppContext()

  useEffect(() => {
    setTimeout(() => {
      router.push('/my-orders')
    }, 5000)
  }, [])

  return (
    <div className='order-placed-container'>
      <div className="order-placed-icon-container">
        <img className="order-placed-checkmark" src={assets.checkmark} alt='' />
        <div className="order-placed-spinner"></div>
      </div>
      <div className="order-placed-text">Order Placed Successfully</div>
    </div>
  )
}

export default OrderPlaced