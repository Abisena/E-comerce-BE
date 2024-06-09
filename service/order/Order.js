import { prisma } from "../../config/prisma.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { cartId } = req.body;

    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: parseInt(cartId, 10) },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId, 10),
        totalAmount,
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // Clear the cart after creating the order
    await prisma.cartItem.deleteMany({
      where: { cartId: parseInt(cartId, 10) },
    });

    res.status(201).json({ msg: "Order created successfully", data: order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to create order", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({
      where: { orderId: parseInt(orderId, 10) },
      include: { orderItems: { include: { product: true } } },
    });

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json({ msg: "Success to get order", data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to get order", error: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.user;
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { orderItems: { include: { product: true } } },
    });

    res.status(200).json({ msg: "Success to get orders", data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to get orders", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { orderId: parseInt(orderId, 10) },
      data: { orderStatus: status },
    });

    res
      .status(200)
      .json({ msg: "Order status updated successfully", data: updatedOrder });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to update order status", error: error.message });
  }
};
