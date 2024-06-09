import express from "express";
import {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} from "../../service/product/Product.js";
import { checkRole } from "../../middleware/isRole.js";
const routes = express.Router();

routes.post("/products", createProduct);
routes.get("/products", getAllProducts);
routes.get("/products/:productId", getProductById);
routes.put("/products/:productId", checkRole("Penjual"), updateProduct);
routes.delete("/products/:productId", checkRole("Penjual"), deleteProduct);

//, checkRole("Penjual")
export default routes;
