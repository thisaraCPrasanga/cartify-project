'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";

import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

import "./SellerPage.css";

const AddProduct = () => {
  const { getToken } = useAppContext()

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('offerprice', offerPrice)

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }

    try {
      const token = await getToken();
      const { data } = await axios.post('/api/product/add', formData, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success(data.message)
        setName('')
        setDescription('')
        setCategory('Earphone')
        setPrice('')
        setOfferPrice('')
        setFiles([])
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit} className="add-product-form">
        <div>
          <p className="add-product-label">Product Image</p>
          <div className="add-product-image-upload-container">

            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden />
                <img
                  key={index}
                  className="add-product-image-preview"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}

          </div>
        </div>
        <div className="add-product-input-group">
          <label className="add-product-label" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="add-product-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="add-product-input-group">
          <label
            className="add-product-label"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="add-product-textarea"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="add-product-row">
          <div className="add-product-small-input-group">
            <label className="add-product-label" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="add-product-input"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="add-product-small-input-group">
            <label className="add-product-label" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="add-product-input"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="add-product-small-input-group">
            <label className="add-product-label" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="add-product-input"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>
        <button type="submit" className="add-product-btn">
          ADD
        </button>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;