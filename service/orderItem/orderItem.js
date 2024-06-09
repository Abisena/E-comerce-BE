// src/controllers/orderItemController.js
import { prisma } from "../../config/prisma.js";

export const addOrderItem = async (req, res) => {
  try {
    const { orderId, productId, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { productId: parseInt(productId, 10) },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const newOrderItem = await prisma.orderItem.create({
      data: {
        orderId: parseInt(orderId, 10),
        productId: parseInt(productId, 10),
        quantity: parseInt(quantity, 10),
        price: product.price,
      },
    });

    res
      .status(201)
      .json({ msg: "Order item added successfully", data: newOrderItem });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to add order item", error: error.message });
  }
};

export const getOrderItems = async (req, res) => {
  try {
    const { orderId } = req.params;

    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: parseInt(orderId, 10) },
      include: { product: true },
    });

    res
      .status(200)
      .json({ msg: "Success to get order items", data: orderItems });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to get order items", error: error.message });
  }
};

export const updateOrderItem = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const { quantity } = req.body;

    const updatedOrderItem = await prisma.orderItem.update({
      where: { orderItemId: parseInt(orderItemId, 10) },
      data: { quantity: parseInt(quantity, 10) },
    });

    res
      .status(200)
      .json({ msg: "Order item updated successfully", data: updatedOrderItem });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to update order item", error: error.message });
  }
};

export const removeOrderItem = async (req, res) => {
  try {
    const { orderItemId } = req.params;

    await prisma.orderItem.delete({
      where: { orderItemId: parseInt(orderItemId, 10) },
    });

    res.status(200).json({ msg: "Order item removed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to remove order item", error: error.message });
  }
};
