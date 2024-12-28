import { Product } from "../models/Product.model.js";

export const createProduct = async (req, res) => {
    const { ProductName, description, price, category, brand } = req.body;

    if (!ProductName || !description || !price || !category || !brand) {
        res.status(400).json({ message: "All fields are required" });
    }

    try {
        const product = new Product({
            ProductName,
            description,
            price,
            category,
            brand,
            owner: req.user._id,
        });

        product
            .save()
            .then(() => {
                res.status(200).json({
                    message: "Product added successfully",
                    product,
                });
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getProducts = async (req, res) => {
    try {
        const product = await Product.find();

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const userProducts = async (req, res) => {
    try {
        const product = await Product.find({ owner: req.user._id });

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const buyProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (!product.isSellable) {
            return res.status(400).json({ message: "Product is already sold" });
        }

        product.buyer = req.user._id;
        product.isSellable = false;

        await product.save();

        return res
            .status(200)
            .json({ message: "Product bought successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getSellableProducts = async (req, res) => {
    try {
        const sellableProducts = await Product.find({ isSellable: true }).sort({
            createdAt: -1,
        });

        if (!sellableProducts.length) {
            return res
                .status(404)
                .json({ message: "No sellable products found" });
        }

        return res.status(200).json(sellableProducts);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const userBuyProducts = async (req, res) => {
    try {
        const buyProductss = await Product.find({ buyer: req.user._id });

        if (!buyProductss.length) {
            return res.status(404).json({ message: "No buy products found" });
        }

        return res.status(200).json(buyProductss);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getProductsById = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    
    try {
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await Product.deleteOne({ _id: productId });

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

