import express from "express";
import {
  addReview,
  getReviewsByProductId,
  updateReview,
  deleteReview,
} from "../../service/review/Review.js";
import { authenticateToken } from "../../middleware/auth.js";

const routes = express.Router();

routes.post("/reviews", authenticateToken, addReview);
routes.get("/reviews/:productId", getReviewsByProductId);
routes.put("/reviews/:reviewId", authenticateToken, updateReview);
routes.delete("/reviews/:reviewId", authenticateToken, deleteReview);

export default routes;
