import React from "react";
import { Link } from "react-router-dom";
import { Tag, Package, Star, Clock, ExternalLink } from "lucide-react";

const ProductCard = ({ product }) => {
  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Product Image or Placeholder */}
      <div className="relative w-full pt-[100%] bg-gray-100">
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-medium px-2 py-1 rounded-full">
            -{discountPercentage}%
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.ProductName}
          </h3>
          {product.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Brand and Category */}
        <div className="flex items-center gap-2 mb-2">
          {product.brand && (
            <span className="inline-flex items-center text-sm text-gray-600">
              <Tag className="w-4 h-4 mr-1" />
              {product.brand}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description || "No description available"}
        </p>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toFixed(2)}/-
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toFixed(2)}/-
            </span>
          )}
        </div>

        {/* Additional Info */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Listed {getTimeAgo(product.createdAt || new Date())}</span>
        </div>

        {/* Action Button */}
        <Link
          to={`/product/${product._id}`}
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
        >
          View Details
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

// Helper function to format time ago
const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + (interval === 1 ? " year ago" : " years ago");
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + (interval === 1 ? " month ago" : " months ago");
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + (interval === 1 ? " day ago" : " days ago");
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + (interval === 1 ? " hour ago" : " hours ago");
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + (interval === 1 ? " minute ago" : " minutes ago");
  
  return "Just now";
};

export default ProductCard;