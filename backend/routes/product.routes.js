import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    buyProduct,
    createProduct,
    deleteProduct,
    getProducts,
    getProductsById,
    getSellableProducts,
    userBuyProducts,
    userProducts,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/", verifyJWT, createProduct);
productRouter.get("/getallproducts", verifyJWT, getProducts);
productRouter.get("/userproducts", verifyJWT, userProducts);
productRouter.put("/products/:productId/buy", verifyJWT, buyProduct);
productRouter.get("/getSellableProducts", verifyJWT, getSellableProducts);
productRouter.get("/buyproductlist", verifyJWT, userBuyProducts);
productRouter.get("/getproductbyid/:productId", verifyJWT, getProductsById);
productRouter.delete("/:productId", verifyJWT, deleteProduct);

export default productRouter;
