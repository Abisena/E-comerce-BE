import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../../service/cart/Cart.js";

const routes = express.Router();

routes.post("/cart", addToCart);
routes.get("/cart/:userId", getCart);
routes.put("/cart/:cartId", updateCartItem);
routes.delete("/cart/:cartId", removeCartItem);

export default routes;
