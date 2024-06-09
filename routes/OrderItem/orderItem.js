import express from "express";
import {
  addOrderItem,
  getOrderItems,
  updateOrderItem,
  removeOrderItem,
} from "../../service/orderItem/orderItem.js";
import { authenticateToken } from "../../middleware/auth.js";
const routes = express.Router();

routes.post("/order-items", authenticateToken, addOrderItem);
routes.get("/order-items/:orderId", authenticateToken, getOrderItems);
routes.put("/order-items/:orderItemId", authenticateToken, updateOrderItem);
routes.delete("/order-items/:orderItemId", authenticateToken, removeOrderItem);

export default routes;
