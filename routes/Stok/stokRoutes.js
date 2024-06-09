import express from "express";
import {
  addStock,
  getStockByProductId,
  updateStock,
  deleteStock,
} from "../../service/stok/Stok.js";
import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();

router.post("/stocks", authenticateToken, addStock);
router.get("/stocks/:productId", authenticateToken, getStockByProductId);
router.put("/stocks/:stockId", authenticateToken, updateStock);
router.delete("/stocks/:stockId", authenticateToken, deleteStock);

export default router;
