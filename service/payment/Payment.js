import { prisma } from "../../config/prisma.js";

export const addPayment = async (req, res) => {
  try {
    const { orderId, amount, method } = req.body;

    const order = await prisma.order.findUnique({
      where: { orderId: parseInt(orderId, 10) },
    });

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    const newPayment = await prisma.payment.create({
      data: {
        orderId: parseInt(orderId, 10),
        amount: parseFloat(amount),
        method,
      },
    });

    res
      .status(201)
      .json({ msg: "Payment added successfully", data: newPayment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to add payment", error: error.message });
  }
};

export const getPaymentByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { orderId: parseInt(orderId, 10) },
    });

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.status(200).json({ msg: "Success to get payment", data: payment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to get payment", error: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    const updatedPayment = await prisma.payment.update({
      where: { paymentId: parseInt(paymentId, 10) },
      data: { status },
    });

    res.status(200).json({
      msg: "Payment status updated successfully",
      data: updatedPayment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to update payment status", error: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    await prisma.payment.delete({
      where: { paymentId: parseInt(paymentId, 10) },
    });

    res.status(200).json({ msg: "Payment deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to delete payment", error: error.message });
  }
};
