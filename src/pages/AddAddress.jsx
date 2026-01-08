import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppContext } from '@/context/AppContext';
import Navbar from '@/components/Navbar';

import "./AddAddress.css";

const AddAddress = () => {
  const navigate = useNavigate();
  const { getToken } = useAppContext();
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.post('/api/user/add-address', { address: formData }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/cart'); // Redirect back to cart or wherever appropriate
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-address-container">
        <div className="add-address-title">Add New Address</div>
        <form onSubmit={handleSubmit} className="add-address-form">
          <div className="add-address-row">
            <input
              required
              onChange={handleChange}
              value={formData.fullname}
              name="fullname"
              className="add-address-input"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <input
            required
            onChange={handleChange}
            value={formData.phone}
            name="phone"
            className="add-address-input"
            type="number"
            placeholder="Phone Number"
          />
          <input
            required
            onChange={handleChange}
            value={formData.address}
            name="address"
            className="add-address-input"
            type="text"
            placeholder="Address (Area and Street)"
          />
          <div className="add-address-row">
            <input
              required
              onChange={handleChange}
              value={formData.city}
              name="city"
              className="add-address-input"
              type="text"
              placeholder="City/District"
            />
            <input
              required
              onChange={handleChange}
              value={formData.state}
              name="state"
              className="add-address-input"
              type="text"
              placeholder="State"
            />
          </div>
          <input
            required
            onChange={handleChange}
            value={formData.pincode}
            name="pincode"
            className="add-address-input"
            type="number"
            placeholder="Pincode"
          />
          <button type="submit" className="add-address-btn">
            ADD ADDRESS
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAddress;
