// src/routes/cartItemRoutes.js
import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  getTotalPrice,
} from "../../service/cartItem/cartItem.js";
import { authenticateToken } from "../../middleware/auth.js";

const routes = express.Router();

routes.post("/cart/items", authenticateToken, addToCart);
routes.get("/cart/items", authenticateToken, getCartItems);
routes.put("/cart/items/:cartItemId", authenticateToken, updateCartItem);
routes.delete("/cart/items/:cartItemId", authenticateToken, removeCartItem);
routes.get("/cart/total-price", authenticateToken, getTotalPrice);

export default routes;
