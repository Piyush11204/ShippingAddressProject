import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
        trim: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        trim: true,
    },
    isSellable: {
        type: Boolean,
        default: true,
    },
});

export const Product = mongoose.model("Product", productSchema);
