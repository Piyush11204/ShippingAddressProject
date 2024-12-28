import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  ShoppingBag, 
  Tag, 
  Building2, 
  AlertCircle, 
  ArrowLeft,
  Package,
  DollarSign,
  Loader2
} from "lucide-react";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/product/getproductbyid/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
                        },
                    }
                );
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setError("Failed to load product details");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBuy = () => {
        // navigate(`/buyerAddress/${id}`);
        navigate(`/buyerAddress/${id}`);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <div className="text-red-500 text-center">
                <p className="text-xl">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 text-blue-600 hover:underline inline-flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" /> Try Again
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" /> Back
                </button>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="px-8 py-10">
                        <div className="border-b pb-8">
                            <div className="flex items-start justify-between">
                                <h1 className="text-3xl font-bold text-gray-900">{product.ProductName}</h1>
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            
                            <div className="mt-4 flex items-center gap-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    <Tag className="h-4 w-4" />
                                    {product.category}
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                    <Building2 className="h-4 w-4" />
                                    {product.brand}
                                </span>
                            </div>
                        </div>

                        <div className="py-8 space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                                <p className="mt-2 text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-6 w-6 text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Price</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleBuy}
                                    disabled={!product.isSellable}
                                    className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg text-white font-medium transition-colors
                                        ${product.isSellable 
                                            ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' 
                                            : 'bg-gray-400 cursor-not-allowed'}`}
                                >
                                    <ShoppingBag className="h-5 w-5" />
                                    {product.isSellable ? 'Proceed to Checkout' : 'Not Available'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;