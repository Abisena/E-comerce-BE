// src/routes/paymentRoutes.js
import express from "express";
import {
  addPayment,
  getPaymentByOrderId,
  updatePaymentStatus,
  deletePayment,
} from "../../service/payment/Payment.js";
import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();

router.post("/payments", authenticateToken, addPayment);
router.get("/payments/:orderId", authenticateToken, getPaymentByOrderId);
router.put("/payments/:paymentId", authenticateToken, updatePaymentStatus);
router.delete("/payments/:paymentId", authenticateToken, deletePayment);

export default router;
