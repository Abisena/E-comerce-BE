import { prisma } from "../../config/prisma.js";

export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const { userId } = req.user;

    const product = await prisma.product.findUnique({
      where: { productId: parseInt(productId, 10) },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const newReview = await prisma.review.create({
      data: {
        productId: parseInt(productId, 10),
        userId: parseInt(userId, 10),
        rating: parseInt(rating, 10),
        comment,
      },
    });

    res.status(201).json({ msg: "Review added successfully", data: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to add review", error: error.message });
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId, 10) },
      include: { user: true },
    });

    res.status(200).json({ msg: "Success to get reviews", data: reviews });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to get reviews", error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const updatedReview = await prisma.review.update({
      where: { reviewId: parseInt(reviewId, 10) },
      data: {
        rating: parseInt(rating, 10),
        comment,
      },
    });

    res
      .status(200)
      .json({ msg: "Review updated successfully", data: updatedReview });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to update review", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    await prisma.review.delete({
      where: { reviewId: parseInt(reviewId, 10) },
    });

    res.status(200).json({ msg: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to delete review", error: error.message });
  }
};
