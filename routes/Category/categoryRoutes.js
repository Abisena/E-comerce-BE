import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../service/category/Category.js";
import { checkRole } from "../../middleware/isRole.js";

const routes = express.Router();

routes.post("/categories", createCategory);
routes.get("/categories", getAllCategories);
routes.get("/categories/:categoryId", getCategoryById);
routes.put("/categories/:categoryId", updateCategory);
routes.delete("/categories/:categoryId", deleteCategory);

// checkRole("Penjual"),

export default routes;
