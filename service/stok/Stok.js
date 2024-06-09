import { prisma } from "../../config/prisma.js";

export const addStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { productId: parseInt(productId, 10) },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const newStock = await prisma.stock.create({
      data: {
        productId: parseInt(productId, 10),
        quantity: parseInt(quantity, 10),
      },
    });

    res.status(201).json({ msg: "Stock added successfully", data: newStock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to add stock", error: error.message });
  }
};

export const getStockByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const stock = await prisma.stock.findUnique({
      where: { productId: parseInt(productId, 10) },
    });

    if (!stock) {
      return res.status(404).json({ msg: "Stock not found" });
    }

    res.status(200).json({ msg: "Success to get stock", data: stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to get stock", error: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { stockId } = req.params;
    const { quantity } = req.body;

    const updatedStock = await prisma.stock.update({
      where: { stockId: parseInt(stockId, 10) },
      data: { quantity: parseInt(quantity, 10) },
    });

    res
      .status(200)
      .json({ msg: "Stock updated successfully", data: updatedStock });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to update stock", error: error.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const { stockId } = req.params;

    await prisma.stock.delete({
      where: { stockId: parseInt(stockId, 10) },
    });

    res.status(200).json({ msg: "Stock deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to delete stock", error: error.message });
  }
};
