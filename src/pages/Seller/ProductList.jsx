'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";

import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

import "./ProductList.css";

const ProductList = () => {

  const { router, getToken, user } = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get("/api/product/seller-list", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (data.success) {
        setProducts(data.products)
        setLoading(false)
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchSellerProduct()
    }
  }, [user])

  return (
    <div className="product-list-container">
      {loading ? <Loading /> : <div className="product-list-content">
        <h2 className="product-list-title">All Product</h2>
        <div className="product-list-table-container">
          <table className="product-list-table">
            <thead className="product-list-thead">
              <tr>
                <th className="product-list-th">Product</th>
                <th className="product-list-th-hidden-mobile">Category</th>
                <th className="product-list-th">
                  Price
                </th>
                <th className="product-list-th-hidden-mobile">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="product-list-tr">
                  <td className="product-list-td-product">
                    <div className="product-list-image-container">
                      <img
                        src={product.image[0]}
                        alt="product Image"
                        className="product-list-image"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <span className="product-list-name">
                      {product.name}
                    </span>
                  </td>
                  <td className="product-list-td-hidden-mobile">{product.category}</td>
                  <td className="product-list-td">${product.offerPrice}</td>
                  <td className="product-list-td-hidden-mobile">
                    <button onClick={() => router.push(`/product/${product._id}`)} className="product-list-visit-btn">
                      <span className="product-list-visit-text">Visit</span>
                      <img
                        className="product-list-visit-icon"
                        src={assets.redirect_icon}
                        alt="redirect_icon"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
      <Footer />
    </div>
  );
};

export default ProductList;