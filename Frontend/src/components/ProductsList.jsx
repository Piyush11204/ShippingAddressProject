// src/pages/ProductsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/product/getSellableProducts", {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="flex flex-wrap justify-center px-4"> 
            {products?.map((product) => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2" key={product._id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
