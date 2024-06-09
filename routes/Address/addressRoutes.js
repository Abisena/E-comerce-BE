// src/routes/addressRoutes.js
import express from "express";
import {
  addAddress,
  getAddressesByUserId,
  updateAddress,
  deleteAddress,
} from "../../service/address/Address.js";
import { authenticateToken } from "../../middleware/auth.js";

const routes = express.Router();

routes.post("/addresses", authenticateToken, addAddress);
routes.get("/addresses", authenticateToken, getAddressesByUserId);
routes.put("/addresses/:addressId", authenticateToken, updateAddress);
routes.delete("/addresses/:addressId", authenticateToken, deleteAddress);

export default routes;
