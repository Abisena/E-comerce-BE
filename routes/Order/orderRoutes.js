import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
} from "../../service/order/Order.js";
import { authenticateToken } from "../../middleware/auth.js";

const routes = express.Router();

routes.post("/orders", authenticateToken, createOrder);
routes.get("/orders/:orderId", authenticateToken, getOrderById);
routes.get("/orders", authenticateToken, getOrdersByUserId);
routes.put("/orders/:orderId/status", authenticateToken, updateOrderStatus);

export default routes;
