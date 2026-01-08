import React from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

import "./AllProducts.css";

const AllProducts = () => {

    const { products, search } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="all-products-container">
                <div className="all-products-header">
                    <p className="all-products-title">All products</p>
                    <div className="all-products-divider"></div>
                </div>
                <div className="all-products-grid">
                    {products
                        .filter(item => item.name.toLowerCase().includes(search.toLowerCase()) ||
                            item.description.toLowerCase().includes(search.toLowerCase()))
                        .map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
